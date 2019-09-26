function tabbar (prevState=true,action) {
    let {type,payload} = action
    switch (type) {
        case 'isShow':
            return prevState = payload;
        default:
            return prevState;
    }
}

export default tabbar