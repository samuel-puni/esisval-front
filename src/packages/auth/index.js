export default function (Vue) {
	//let authenticatedUser = {}
	Vue.auth = {
		setToken (data) {
			localStorage.setItem('token', data.access_token)
			localStorage.setItem('expiration', data.expires_in + Date.now())
		},
		getToken () {
			var token = localStorage.getItem('token')
			var expiration = localStorage.getItem('expiration')

			if ( !token || !expiration )
				return null
			if(Date.now() > parseInt(expiration)){
				this.destroyToken()
				return null
			}
			else
				return token
			/*if ( !token  || !expiration )
				return null
			else
				return token*/

		},
		destroyToken () {
			localStorage.removeItem('token')
			localStorage.removeItem('expiration')	
		},
		isAuthenticated () {
			if(this.getToken())
				return true
			else
				return false
		},
		/*setAuthenticateUser(data){
			authenticateUser = data
		},
		getAuthenticateUser(){
			return authenticateUser
		}*/
	}

	Object.defineProperties(Vue.prototype, {
		$auth: {
			get: () => {
				return Vue.auth
			}
		}
	})
}