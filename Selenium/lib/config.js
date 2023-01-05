const userConfig = {
	username: 'sharma.shray92@gmail.com',
	password: 'P@ssw0rd1!'
}
//do not put instance URL with the last slash
const instanceConfig ={
	instanceURL: 'https://applications.eu-1.celonis.cloud/ui/login'

}


const testConfig ={
	//Default value is Yes when left blank it is taken as no.
headless: 'yes'
}
module.exports = {userConfig,instanceConfig,testConfig};