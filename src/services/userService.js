import axios_service from '../services/axiosService';
import {baseURL} from './environment'

class UserService{

    constructor(){
        this.axios_service = new axios_service();
    }

    login(data){
       let url = baseURL+'user/login';
       return this.axios_service.post(url,data);
    }

    register(data){
       let url = baseURL+'user/userSignUp';
        return this.axios_service.post(url,data);
    }

    addNotes(data){
        let url = baseURL+'notes/addNotes';
        debugger;
         return this.axios_service.post(url,data);
     }

     getAllNotes(){
        let url = baseURL+'notes/getNotesList';
        return this.axios_service.Get(url)
    }
    
    addNotes(data){
        let url = baseURL+'notes/addNotes';
        debugger;
         return this.axios_service.post(url,data);
     }

     changeColor(data) 
    {
        let url = baseURL+'notes/changesColorNotes';
        return this.axios_service.post(url,data);
    }

    deleteNote(data){
        let url = baseURL+'notes/trashNotes';
        return this.axios_service.post(url,data);
    }

    archiveNote(data){
        let url = baseURL+'notes/archiveNotes';
        return this.axios_service.post(url,data);
    }

    forgetpassword =(data)=>{
        let url = baseURL+'user/reset';
        return this.axios_service.post(url,data);
    }
    resetpassword =(data)=>{

        let url = baseURL+'user/reset-password';
        return this.axios_service.post(url,data);
    }


    updateNote(data) 
    {
        let url = baseURL+'notes/updateNotes';
        return this.axios_service.post(url,data);
    }
    searchCollab(data) 
    {
        let url = baseURL+'user/searchUserList';
        return this.axios_service.post(url,data);
    }

    addCollab(data,noteId) 
    {
        let url = baseURL+"notes/"+noteId+"/AddcollaboratorsNotes";
        return this.axios_service.post(url,data);
    }

}
export default new UserService();