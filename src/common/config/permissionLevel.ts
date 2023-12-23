import config from './env.config'

const Levels = {
    ADMIN: config.permissionLevels.ADMIN,
    VENDOR: config.permissionLevels.PAID_USER,
    CUSTOMER: config.permissionLevels.NORMAL_USER
}


export default Levels 
