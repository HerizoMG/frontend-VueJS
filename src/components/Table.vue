<template>
    <div class="containerTable">
        <div class="tableView">
            <table class="rectangle-table">
                <thead>
                <tr>
                    <th>Numero</th>
                    <th>Nom</th>
                    <th>Prénoms</th>
                    <th>Salaire</th>
                    <th>Observation</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(employes,index) in employed" :key="index">
                    <td>{{ employes.id }}</td>
                    <td>{{ employes.nomEmployed }}</td>
                    <td>{{ employes.prenomsEmployed }}</td>
                    <td>{{ employes.salaire }}</td>
                    <td>{{ getSalaireCategory(employes.salaire) }}</td>
                    <td>
                        <svg @click="openEditModal(employes)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 16"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                            <path fill="#4ef542" d="m7.5 9l-3 .54L5 6.5L10.73.79a1 1 0 0 1 1.42 0l1.06 1.06a1 1 0 0 1 0 1.42Z"/><path d="M12 9.5v3a1 1 0 0 1-1 1H1.5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3"/></g>
                        </svg>
                        <svg @click="deleteEmployed(employes.id)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#ff0e84" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"/>
                        </svg>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <Modal ref="modal" :updateModal="updating" @actualiser="this.getEmployed" :employedToEdit="employedTmpEdit"/>
        <div class="buttonAdd">
            <button  @click="openModal" type="submit">Ajouter</button>
        </div>
    </div>
    <div class="affichage">
        <div> Salaire Minimale : {{ salaireMin(employed.salaire) }}</div>
        <div>Salaire Maximale : {{ salaireMax(employed.salaire) }}</div>
        <div>Salaire Totale  : {{ salaireTotal(employed.salaire) }}</div>
    </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import TutorialDataService from "../services/TutorialDataService";

export default {
    name: "Table",
    components: {Modal},
    data() {
        return {
             employed: [],
             employedTmpEdit:[],
             updating:false
        }
    },
    methods: {
        openModal() {
            this.$refs.modal.openModal();
            this.updating = false;
        }, 

        //affiche tout les donnees

        getEmployed() {
        TutorialDataService.getAll()
            .then(res => {
                this.employed= res.data.employee;
                console.log(employed.value);
            })
            .catch(error => {
                console.error(error);
            });
        },

        // mediocre ou grand ou moyen

        getSalaireCategory(salaire){
            if (salaire < 1000){
                return "médiocre";
            }
            else if (salaire >= 1000 && salaire <= 5000){
                return "moyen";
            } else {
                return "grand";
      }
        },

        // supprimer

        deleteEmployed(employesId){
            if (confirm('Are you sure you want to delete this data?')) {
                TutorialDataService.delete(employesId)
                    .then(res =>{
                        alert(res.data.message);
                        this.getEmployed();
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 404) {
                            alert(error.response.data.message);
              }
            });
            }
            
        },

        salaireMin() {
            if (this.employed.length === 0) {
                return 0;
            }
            let min = this.employed[0].salaire;
            for (let i = 1; i < this.employed.length; i++) {
                const minSalaire = this.employed[i].salaire;
                if (minSalaire < min) {
                    min = minSalaire;
                }
            }
        return min;
        },
        
        salaireMax() {
            if (this.employed.length === 0) {
                return 0; 
            }
            let maxSalaire = 0;
            for (let i = 0; i < this.employed.length; i++) {
                const max = this.employed[i].salaire;
                if (maxSalaire <  max) {
                    maxSalaire = max;
                }
            }
        return maxSalaire;
        },

        salaireTotal(){

            if (this.employed.length === 0) {
                return 0; 
            }
            let totalSalaire = 0;
            for (let i = 0; i < this.employed.length; i++) {
                const total = this.employed[i].salaire;

                totalSalaire = totalSalaire + total;
            }
            return totalSalaire;
        },

        openEditModal(employes){
        this.employedTmpEdit = { ...employes };
        this.$refs.modal.openModal();
        this.updating = true;
    }

    },
    mounted() {
        this.getEmployed();
        this.getSalaireCategory();
    },

}
</script>

<style scoped>
    .affichage{
        position: absolute;
        z-index: 9999;
        left: 100px;
        bottom: 60px;
        width: 200px;
        color: #12f669;
    }
</style>