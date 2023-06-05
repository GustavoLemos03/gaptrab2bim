<template>
    <v-main class="bg-grey-lighten-3">
        <v-container>
            <v-row>

                <v-col cols="12" sm="12">
                    <h1 class="center">Frutas</h1>
                    <v-sheet min-height="70vh" rounded="lg" class="pa-12">
                        <v-row justify="space-around">

                            <v-col cols="5">
                                <v-form ref="form">
                                    <v-text-field v-model="item" :rules="nameRules" label="Nome da fruta"
                                        required></v-text-field>


                                    <v-text-field v-model="qtd" :rules="qtdRules" label="Quantidade"
                                        required></v-text-field>



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

                            <v-col cols="5" v-if="lista.length != 0">
                                <v-card width="400" v-for="i in lista" :key="i" class="bg-grey-lighten-3">
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
                            <v-col cols="5" v-if="lista.length == 0">
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
        lista: [],
        cod: ''
    }),

    methods: {

        addList() {

            if (this.qtd != '' && this.item != '') {
                if (this.alter == false) {
                    this.lista.push({ item: this.item, qtd: this.qtd, cod: this.lista.length + 1 })
                } else {
                    var index_edit = this.lista.findIndex((x) => x.cod === this.cod);
                    this.lista[index_edit] = { cod: this.cod, item: this.item, qtd: this.qtd }
                    this.alter = true;
                }

            }
            this.item = null
            this.qtd = null
        },
        removeItem(index) {
            var index_remove = this.lista.findIndex((x) => x.cod === index);

            this.lista.splice(index_remove, 1)

        },
        edit(index) {
            this.alter = true;
            this.cod = index;

            var index_edit = this.lista.findIndex((x) => x.cod === index);
            this.cod = index;
            this.item = this.lista[index_edit].item;
            this.qtd = this.lista[index_edit].qtd;



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
}
</script>