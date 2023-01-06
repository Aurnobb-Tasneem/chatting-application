import React, { Component } from 'react'
import { Grid,Form,Segment,Button,Header,Message,Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import {getAuth,createUserWithEmailAndPassword,updateProfile,getDatabase, ref, set} from "../../firebase"

export default class Register extends Component {

    state={
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
        errormsg:"",
        successmsg:"",
        loader: false
    }


    handleChange= (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    isFormValid=({username,email,password,confirmpassword})=>{
        if(!username.length||!email.length||!password.length||!confirmpassword.length){
            this.setState({errormsg:"All field are not completed."});
            this.setState({successmsg:""});
            this.setState({password:""});
    }
        else if (password.length<8){;
            this.setState({errormsg:"Password is weak."})
            this.setState({successmsg:""});
            this.setState({password:""});

        }
        else if (password!=confirmpassword){
            this.setState({errormsg:"Password doesn't match"});
            this.setState({successmsg:""});
            this.setState({password:""});

        }
        else{
            return true;
        }
    }



    writeUserData=(userCredential)=> {
      const db = getDatabase();
      set(ref(db, 'users/' + userCredential.user.uid), {
        username:this.state.username
      });
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.isFormValid(this.state)){
            this.setState({loader:true});
        createUserWithEmailAndPassword(getAuth(), this.state.email, this.state.password)
  .then((userCredential) => {

        

    updateProfile(getAuth().currentUser, {
        displayName:this.state.username
      }).then(()=>{
        this.writeUserData(userCredential)
        console.log(userCredential.user.uid)
      })
      .then(() => {
        this.setState({username:""});
    this.setState({email:""});
    this.setState({password:""});
    this.setState({confirmpassword:""});
    this.setState({errormsg:""});
    this.setState({successmsg:"Account created sucessfully"})
    this.setState({loader:false})
      }).catch((error) => {
        this.setState({loader:false})
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode){
        this.setState({errormsg:"Username is not valid"});
        this.setState({successmsg:""})
        this.setState({password:""});
    }
      });

    
  })
  .catch((error) => {
    this.setState({loader:false})
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode.includes("email")){
        this.setState({errormsg:"Email already in use!"});
        this.setState({successmsg:""});
        this.setState({password:""});

    }

    // ..
  });

    }}

    


  render() {
    
    const {username,email,password,confirmpassword,errormsg,successmsg,loader}=this.state;

    return (
      <div>
      <Grid textAlign='center' verticalAlign='center' style={{marginTop:"2px"}} >
        <Grid.Column style={{maxWidth:500}} >
            <Header as='h1' Icon style={{color:"#125589"}} textAlign='center'>
                <Icon name='group'/>
                
                Krinky
            </Header>
            <Segment  stacked inverted color='grey'>
            <Segment stacked inverted>

                {errormsg?<Message negative>
                <Message.Header>{errormsg}</Message.Header>
                         </Message>:""}
                    
                 {successmsg?<Message positive>
                <Message.Header>{successmsg}</Message.Header>
                         </Message>:""}
            
            <Form inverted  onSubmit={this.handleSubmit} >
            <Form style={{textAlign:"left"}}>

                <Form.Input name="username" fluid label='Username' placeholder='username' type='text' onChange={this.handleChange} value={username} className={errormsg.includes("Username")?"error":""}/>
                <Form.Input name="email" fluid label='Email' placeholder='Email' type='email' onChange={this.handleChange} value={email} className={errormsg.includes("Email")?"error":""}/>
                <Form.Input name="password" fluid label='Password' placeholder='Password' type='password' onChange={this.handleChange}value={password} className={errormsg.includes("Password")?"error":""}/>
                <Form.Input name="confirmpassword" fluid label='Confirm Password' placeholder='Confirm Password' type='password' onChange={this.handleChange} value={confirmpassword} className={errormsg.includes("Password")?"error":""}/>
            
            </Form>
 
            <Button style={{marginTop:"10px", textAlign:"center"}} type='submit' className={loader?"disabled loading primary":""}>Submit</Button>
            
            </Form>
    
            </Segment>
            <Message attached='bottom' warning>
      <Icon name='help' />
      Already signed up?&nbsp;<Link to="/login">Login</Link> instead.
    </Message>
            </Segment>
            
        </Grid.Column>
      </Grid>
      </div>
    )
  }
}
