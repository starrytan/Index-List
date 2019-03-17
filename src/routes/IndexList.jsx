import React from 'react';
import {connect} from 'dva';
import $ from 'jquery';
import styles from './indexlist.css';

//元素高度数组
let heightarr = []
class IndexList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    goplace = (val) => {
        console.log('val: ', val-13);
        $('body,html').animate({scrollTop: val-13})
    }
    render() {
        const {testdata} = this.props.indexlist
        if (testdata) {
            return (
                <div className={styles.box}>
                <div id='heard' className={styles.heard}>全部城市</div>
                <div style={{paddingTop:'40px'}}>
                {testdata.map((item, index) => {
                        return (
                            <div id={'main'+index} key={index}>
                            <div className={styles.title}>{Object.keys(item)}</div>                              
                                <div>                
                                    {item[Object.keys(item)].map((itema, indexa) => {
                                        return (
                                            <div className={styles.city} key={indexa}>
                                                {itema.city}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.slider}>
                    {testdata.map((item,index)=>{
                        return(
                            <div onClick={()=>this.goplace(heightarr[index])} key={index}>
                            {Object.keys(item)}
                            </div>
                        )
                    })}</div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
    componentDidUpdate(){   
        let that=this
        for(let i=0;i<this.props.indexlist.testdata.length;i++){
            let main=document.getElementById('main'+i)
            heightarr.push(main.offsetTop)
        }      
        let heard=document.getElementById('heard')
        window.addEventListener('scroll',function(){
            let scroll =document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            for(let i=0;i<heightarr.length;i++){             
                if(scroll+14>=heightarr[i] && scroll+14< heightarr[i + 1]){               
                    heard.innerHTML=Object.keys(that.props.indexlist.testdata[i]) 
                }
            }
            if(scroll==0){
                heard.innerHTML='全部城市'
            }
        })
    } 
}

export default connect(({indexlist}) => ({indexlist}))(IndexList);
