<template>
    <div class="modal" v-show="open">
        <div class="modalInside">
            <div>
                <h2>Nouveau Employé</h2>
            </div>
            <div class="inputForm">
                <form action="">
                    <input type="text" placeholder="Nom" v-model="model.employee.nomEmployed">
                    <input type="text" placeholder="Prénoms"  v-model="model.employee.prenomsEmployed" >
                    <input type="text" placeholder="Salaire"  v-model="model.employee.salaire" >
                </form>
            </div>
            <div class="inputButton">
                <button v-if="!this.updateModal" @click="saveEmployed">Enregitrer</button>
                <button v-else @click="updateEmployed">Modifier</button>
                <button class="bottonClose" @click="open = false">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import TutorialDataService from '../services/TutorialDataService';


export default {

    props : {
        employedToEdit :{
            type : Object
        },
        updateModal :{
            type : Boolean
        },
    },

    name: "Modal",
    data() {
        return {
            open : false,
            model: {
                employee: {
                    nomEmployed: '',
                    prenomsEmployed: '',
                    salaire: ''
                }
            }
        }
    },

    watch : {
        employedToEdit :{
            immediate : true,
            handler(varEmployed){
                if(varEmployed){
                    this.model.employee.nomEmployed = varEmployed.nomEmployed;
                    this.model.employee.prenomsEmployed = varEmployed.prenomsEmployed;
                    this.model.employee.salaire = varEmployed.salaire;
                }
            }
        },

    },

    methods: {
        openModal() {
            this.open = true;
        },

        
        editEmployee(employee) {
            this.openModal();
            this.model.employee.nomEmployed = employee.nomEmployed;
            this.model.employee.prenomsEmployed = employee.prenomsEmployed;
            this.model.employee.salaire = employee.salaire;
        },

        updateEmployed() {
                TutorialDataService.update(this.employedToEdit.id, this.model.employee)
                .then(res => {
                    alert(res.data.message);
                    this.open = false;
                    this.$emit("actualiser");
                    this.updateModal = false;
                    
                })

                .catch(error => {
                   if (error.response && error.response.status === 422) {
                        this.errorList = error.response.data.errors;
                    } 
                })
                .finally( () =>{
                        this.model.employee.nomEmployed ='',
                        this.model.employee.prenomsEmployed ='',
                        this.model.employee.salaire = null
                    });
        },

        saveEmployed(){
            TutorialDataService.create(this.model.employee)
                    .then(res => {
                        alert(res.data.message);
                        this.open = false;
                        this.$emit("actualiser")
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 422) {
                            this.errorList = error.response.data.errors;
                        }
                    })
                    .finally( () =>{
                        this.model.employee.nomEmployed ='',
                        this.model.employee.prenomsEmployed ='',
                        this.model.employee.salaire = null
                    });
            }
        }
    }

</script>

<style scoped>
.modal {
    position: fixed;
    z-index: 999;
    width: 400px;
    height: 500px;
    color: #12f669;
    -webkit-transition: opacity 600ms linear 600ms;
    -moz-transition: opacity 600ms linear 600ms;
    -ms-transition: opacity 600ms linear 600ms;
    -o-transition: opacity 600ms linear 600ms;
    transition: opacity 600ms linear 600ms;
    background: #222429;
    text-align: center;
}

.modalInside {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}


.inputForm form input {
    width: 300px;
    height: 30px;
    margin: 20px;
    border: 1px solid #12f669;
    border-radius: 10px;
    background: #222429;
    color: #ffffff;
    font-size: 20px;
    padding: 10px;
}

.inputButton {
    margin-bottom: 50px;
}

.inputButton button {
    margin: 5px 10px;
    color: #ffffff;
}

.bottonClose {
    background-color: #BD5532;
    color: white;
}


.inputForm form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>