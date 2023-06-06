<template>
    <v-main class="bg-grey-lighten-3">
        <v-container>
            <v-row>

                <v-col cols="12" sm="12">

                    <v-sheet min-height="100vh" rounded="lg" class="pa-12">
                        <v-row justify="space-around">


                            <v-col cols="5" v-if="frutas.length != 0">
                                <h3>Todas as frutas</h3>
                                <v-card width="400" v-for="i in frutas" :key="i" class="ma-3 bg-grey-lighten-3">
                                    <div class="d-flex flex-no-wrap justify-space-between">
                                        <div>
                                            <v-card-title class="text-h5">
                                                {{ i.item }}
                                            </v-card-title>

                                            <v-card-subtitle> Quantidade: {{ i.qtd }}</v-card-subtitle>

                                            <v-card-actions>
                                                <v-btn class="ms-2" icon="mdi-delete" variant="text"
                                                    @click="removeItem(i.cod)"></v-btn>

                                                <v-btn class="ms-2" icon="mdi-pencil" variant="text"
                                                    @click="edit(i.cod)"></v-btn>
                                            </v-card-actions>
                                        </div>


                                    </div>
                                </v-card>
                            </v-col>
                            <v-col cols="5" v-if="frutas.length == 0">
                                <v-card width="400" class="bg-grey-lighten-3">
                                    <div class="d-flex flex-no-wrap justify-center">
                                        <div>
                                            <v-card-title class="text-h5">
                                                Estoque vazio!
                                            </v-card-title>

                                            <v-avatar class="ma-3" size="125" rounded="0">
                                                <v-img src="../../public/vazio.png"></v-img>
                                            </v-avatar>

                                        </div>


                                    </div>
                                </v-card>
                            </v-col>
                            <v-col cols="5">
                                <v-form ref="form">
                                    <v-text-field v-model="item" :rules="nameRules" label="Nome da fruta" required
                                        variant="underlined"></v-text-field>


                                    <v-text-field v-model="qtd" :rules="qtdRules" label="Quantidade" required
                                        variant="underlined"></v-text-field>



                                    <div class="d-flex flex-column">
                                        <v-btn color="success" class="mt-4" block @click="validate">
                                            Cadastrar
                                        </v-btn>

                                        <v-btn color="error" class="mt-4" block @click="reset">
                                            Cancelar
                                        </v-btn>

                                    </div>

                                </v-form>
                            </v-col>


                        </v-row>
                        <v-row justify="start">
                            <v-col cols="5" class="ml-15 mt-5">
                                <h3> Pesquisar </h3>
                                <v-row>
                                    <v-col cols="10">
                                        <v-form ref="form">
                                            <v-text-field v-model="name" label="Nome da fruta" variant="underlined"
                                                required id="name"></v-text-field>


                                        </v-form>

                                    </v-col>
                                    <v-col cols="auto">
                                        <v-btn icon="mdi-magnify" size="small" color="primary" @click="pesquisar()"></v-btn>
                                    </v-col>
                                </v-row>

                                <p v-if="found.length!=0">{{ (found.item) }}/ Quantidade: {{ found.qtd }}</p>
                                <p v-if="noresults">Nenhuma fruta cadastrada com esse nome</p>

                            </v-col>
                        </v-row>

                    </v-sheet>
                </v-col>


            </v-row>

        </v-container>
    </v-main>
</template>
<script>
export default {
    data: () => ({
        valid: true,
        nameRules: [
            v => !!v || 'Preenchimento obrigatório',
        ],
        qtdRules: [
            v => !!v || 'Preenchimento obrigatório',
        ],

        item: '',
        qtd: '',
        link: '',
        alter: false,
        frutas: [],
        cod: '',
        found:[],
        noresults:false
    }),

    methods: {
        save() {
            const parsed = JSON.stringify(this.frutas);
            localStorage.setItem('frutas', parsed);
        },

        addList() {

            if (this.qtd != '' && this.item != '') {
                if (this.alter == false) {
                    this.frutas.push({ item: this.item.toUpperCase(), qtd: this.qtd, cod: this.frutas.length + 1 })

                    this.save();
                } else {
                    var index_edit = this.frutas.findIndex((x) => x.cod === this.cod);
                    this.frutas[index_edit] = { cod: this.cod, item: this.item.toUpperCase(), qtd: this.qtd }
                    this.alter = true;

                    this.save();
                }

            }

            this.item = null
            this.qtd = null
            this.alter = false
        },
        removeItem(index) {
            var index_remove = this.frutas.findIndex((x) => x.cod === index);

            this.frutas.splice(index_remove, 1)
            this.save();


        },
        edit(index) {
            this.alter = true;
            this.cod = index;

            var index_edit = this.frutas.findIndex((x) => x.cod === index);
            this.cod = index;
            this.item = this.frutas[index_edit].item;
            this.qtd = this.frutas[index_edit].qtd;

        },
        pesquisar() {
            var search = this.frutas.find(e => e.item == this.name);

            if(search!=undefined){
                this.found = search
                this.noresults = false
            }else{
                this.noresults=true
                this.found=[]
            }
            
        },
        async validate() {
            const { valid } = await this.$refs.form.validate()

            if (valid) this.addList()
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
    },
    mounted() {
        if (localStorage.getItem('frutas')) {
            try {
                this.frutas = JSON.parse(localStorage.getItem('frutas'));
            } catch (e) {
                localStorage.removeItem('frutas');
            }
        }



    },
}
</script>

<style>
#name{
    text-transform: uppercase;
}
</style>