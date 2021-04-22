const assert = require('chai').assert
const Service = require('../../models/service')
require('../../config/database')
const newdesc = 'Rodolfo Mascarpone'

const servicesArray = [
    {company: "73448121J",description:"adsf",capacity:2,price:10},
    {company: "73448121J",description:"adasdfsf",capacity:2,price:10},
    {company: "73448121J",description:"adasdfsf",capacity:2,price:10}
    ]

describe('Service model tests',function () {
    let servicesID =[]
    before(function (done) {
        let numServiceCreated = 0
        ServicesArray.forEach(function (ServiceData) {
            let service = new Service(ServiceData);
            service.save(function (error,Service) {
                if (error) throw  error;
                servicesID.push(service._id);
                numServiceCreated++;
                if (numServiceCreated == servicesArray.length){
                    done();
                }
            })
        })

    })
    after(function (done) {
        let numServiceRemoved = 0
        servicesArray.forEach(function (serviceData) {
            Service.findOneAndRemove({description: serviceData.description},{},function (err, doc) {
                if (err) throw err;
                numServiceRemoved++;
                if (numServiceRemoved == (ServicesArray.length-1)){
                    done();
                }
            })
        })
    })

    it('Should find all Services without error',function (done) {
        Service.find(function (error, services) {
            assert.isAtLeast(services.length,3)
            done();
        })
    })

    it('Should find a Service by name',function (done) {
        Service.findOne({description:servicesArray[1].description}, function (err,doc) {
            if (err) throw  err;
            assert.isNotNull(doc)
            done();
        })
    })

    it('Should change the description of a Service',function (done) {
        Service.findOneAndUpdate({description:servicesArray[0].description},{description:newdesc},
            {returnOriginal:false, upsert:true, new:true},
            function (err,doc) {
                if(err){ throw err;}
                assert.isNotNull(doc);
                assert.equal(doc.description,newdesc);
                servicesArray[0].description = newdesc;
                done();
            })
    })

    it('Should delete a Service by name',function (done) {
        Service.findOneAndRemove({description: servicesArray[0].description},{},function (err, doc) {
            if (err) throw err;
            assert.isNotNull(doc)
            done();
        })
    })
})
