import nodemailer from 'nodemailer'
import config from '../config/env.config'
import {MailService} from './email.service2'
import mailTemplate from '../templates/resetPassword'
import Logging from '../libraries/logging';

type data = {
    from: string,
     to: string,
     subject: string,
     html: string,
     text: string
    }

class SendMail {
   
    constructor(data:data) {
       this.send(data)
    }


   async testAccount(){
        let account = await nodemailer.createTestAccount();
        let transporter = await nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });

        return transporter
    }

   async liveAccount(){
            let transport = await nodemailer.createTransport({
            host: '169.255.57.93', //config.SMTP_HOST,
            port: Number(config.SMTP_PORT),
            secure: true,
            auth: {
                user: config.SMTP_USERNAME,
                pass: config.SMTP_PASSWORD,
            },

        })

        return transport
    }


    async send(data){
        await this.liveAccount().then(transport=>{
            transport.sendMail(data, (err, info)=>{
               return new Promise((resolve, reject)=>{
                if(!err){
                    console.log({'mail sent result': info})
                    resolve(info)
                    
                }else{
                    console.log({err: err})
                    reject(err)
                    
                }
               })
                
            })
        })
        .catch(err=>{
            Logging.error(`error creating connection to mail server ${err}`)
        })

        
    }

}
 

export async function sendPasswordReset(user, newPassword) {

    const data = {
        from: `"${config.name}" <info@peco-online.com.ng>`,
        to: `${user.email}, macdominicsavio@gmail.com`,
        subject: 'Password Reset Request',
        html: mailTemplate(user.firstName, newPassword).html,
        text: mailTemplate(user.firstName, newPassword).text
    }
    
    return new SendMail(data)
}