import request from '../utils/request'
import Mtils from 'mtils'

export default {
    namespace : 'indexlist',
    state : {
        testdata: false
    },
    subscriptions : {
        setup({dispatch, history}) { // eslint-disable-line
            if (history.location.pathname == '/') {
                dispatch({type: 'fetch'})
            }
        }
    },

    effects : {
        *fetch({
            payload
        }, {call, put}) { // eslint-disable-line
            let res = yield request('/data')
            console.log('res: ', res);
            let data ={}
            res.data.data.forEach(element => {
                    let a = Mtils.utils.makePy(element.city, true);
                    if (data.hasOwnProperty(a.split('')[0])){
                        data[a.split('')[0]].push(element)
                    } else {
                        data[a.split('')[0]] = [element]
                    }
                });               
                let reslut=[]
                let herd=[]
                for(let i in data){
                  herd.push(i)
                }   
                herd.sort() 
                for(let j of herd){
                  let b={}
                  b[j]=data[j]
                  reslut.push(b)           
                }              
            yield put({type: 'save', data: reslut})
        }
    },

    reducers : {
        save(state, {data}) {
            return {
                ...state,
                testdata: data
            };
        }
    }
};
