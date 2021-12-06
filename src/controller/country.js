const { country } = require('../../models')
const Joi = require('joi')

exports.addCountry = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required()
    })

    const { error } = schema.validate(req.body)

    if(error) {
        return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })
    }

    try {
        const name = req.body.name
        // check if country already created
        const isExist = await country.findOne({
            where: {
                name
            }
        })
        
        if(isExist) {
            return res.status(400).send({
                error: {
                    message: "Country is already added"
                }
            })
        }

        // if not, create a new country
        const newCountry = await country.create({
            name,
        })

        res.status(200).send({
            status: 'success',
            data: {
                newCountry
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'server error',
        })
    }
}

exports.getCountries = async (req, res) => {
    try {
        const countries = await country.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
        })
    
        res.send({
          status: "success",
          data: {
            countries,
          },
        });

      } catch (error) {
        console.log(error);
        res.send({
          status: "failed",
          message: "Server Error",
        });
    }
};

exports.getCountry = async (req, res) => {
    try {
      const { id } = req.params;
  
      const data = await country.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
  
      res.send({
        status: "success",
        data
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
};
  

exports.deleteCountry = async (req, res) => {
    try {
      const { id } = req.params;
  
      await country.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        data: {
            id: `${id}`
        },
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
}

exports.updateCountry = async (req, res) => {
    
    const { id } = req.params;
    const name = req.body.name
    
    // check if country is exist
    let isExist =  await country.findOne({
        where: {
            id: `${id}`
        }
    })
    if(!isExist){
        res.status(400).send({
            status: "failed",
            message: `country with the id : ${id} is not exist`
        })
    }
    // check if the country name already exist
    isExist = await country.findOne({
      where: {
        name  
      }
    })
    if(isExist){
      res.status(400).send({
        status: 'failed',
        message: 'country already exist'
      })
    }

    // check if the country already added
    

    try {

      await country.update(req.body, {
        where: {
          id,
        },
      });

      const updatedCountry = await country.findOne({
          where: {
              id
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
      })
  
      res.send({
        status: "success",
        data: updatedCountry,
      });

    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };