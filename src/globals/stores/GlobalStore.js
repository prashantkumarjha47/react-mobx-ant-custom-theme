import { observable } from "mobx"

class GlobalStore {
    @observable isLoggedIn = false
    @observable loading = false
    @observable collapsed = false
    @observable user = {}

    constructor() {
        this.user = JSON.parse(localStorage.getItem('user'))
        if (this.user) {
            this.isLoggedIn = true
        }
    }
    setLogin = (status) => {
        this.isLoggedIn = status
    }

    setUserInfo = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
    }

    toggle = () => {
        this.collapsed = !this.collapsed
    }
}

export default GlobalStore