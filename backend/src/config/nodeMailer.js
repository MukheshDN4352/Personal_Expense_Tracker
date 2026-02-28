import nodemailer from "nodemailer";

const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    secure:true,
    port:465,
    auth:{
        user: 'mukeshdn2005@gmail.com',
        pass:'xipn arnm vtfp ofir'
    }
})

export default transporter;