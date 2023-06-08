<template>
    <v-main class="bg-grey-lighten-3">
        <v-container>

            <v-row>

                <v-col cols="12" sm="12">
                    <h1 class="center">Clientes</h1>
                    <v-sheet min-height="70vh" rounded="lg" class="pa-12">

                        <v-row justify="space-around">

                            <v-col cols="5">
                                <v-form ref="form">
                                    <v-text-field v-model="nomecliente" :rules="nameRules" label="Nome do cliente:"
                                        required></v-text-field>

                                    <v-text-field v-model="cpf" :rules="nameRules" label="CPF:" required></v-text-field>

                                    <v-text-field v-model="email" :rules="nameRules" label="Email:" required></v-text-field>

                                    <v-text-field v-model="telefone" :rules="nameRules" label="Telefone:"
                                        required></v-text-field>


                                    <v-row>
                                        <v-col> <v-text-field v-model="rua" :rules="nameRules" label="Rua:"
                                                required></v-text-field></v-col>
                                        <v-col>
                                            <v-text-field v-model="numero" :rules="nameRules" label="Número:"
                                                required></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-text-field v-model="cidade" :rules="nameRules" label="Cidade:"
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

                            <v-col cols="5" v-if="cliente.length != 0">
                                <v-card width="400" v-for="i in cliente" :key="i" class="bg-grey-lighten-3">
                                    <div class="d-flex flex-no-wrap justify-space-between">
                                        <div>
                                            <v-card-title class="text-h5">
                                                {{ i.nomecliente }}
                                            </v-card-title>
                                            
                                            <v-card-text>
                                                <p>CPF: {{ i.cpf }}</p>
                                                <p>email: {{ i.email }}</p>
                                                <p>Telefone: {{ i.telefone }}</p>
                                                <p>Rua: {{ i.rua }}  N°: {{ i.numero }}</p>
                                                <p>Cidade: {{ i.cidade }}</p>
                                            </v-card-text>

                                            

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
                            <v-col cols="5" v-if="cliente.length == 0">
                                <v-card width="400" class="bg-grey-lighten-3">
                                    <div class="d-flex flex-no-wrap justify-center">
                                        <div>
                                            <v-card-title class="text-h5">
                                                Nenhum cliente cadastrado!
                                            </v-card-title>

                                            <v-avatar class="ma-3" size="125" rounded="0">
                                                <v-img src="../../public/cliente.png"></v-img>
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
        nomecliente: '',
        cpf: '',
        email: '',
        telefone: '',
        rua: '',
        cidade: '',
        numero: '',

        alter: false,
        cliente: [],
        cod: ''
    }),

    methods: {
        save() {
            const parsed = JSON.stringify(this.cliente);
            localStorage.setItem('cliente', parsed);
        },
        addList() {


            if (this.alter == false) {
                this.cliente.push({ cod: this.cliente.length + 1, nomecliente: this.nomecliente, cpf: this.cpf, email: this.email, telefone: this.telefone, rua: this.rua, numero: this.numero, cidade: this.cidade })
               
                 this.save(); 
            } else {
                var index_edit = this.cliente.findIndex((x) => x.cod === this.cod);
                this.cliente[index_edit] = { cod: this.cliente.length + 1, nomecliente: this.nomecliente, cpf: this.cpf, email: this.email, telefone: this.telefone, rua: this.rua, numero: this.numero, cidade: this.cidade }
                this.alter = true;
                this.save();
            }

            this.nomecliente = null;
            this.cpf = null;
            this.email = null;
            this.rua = null;
            this.telefone = null;
            this.numero = null;
            this.cidade = null;



        },
        removeItem(index) {
            var index_remove = this.cliente.findIndex((x) => x.cod === index);

            this.cliente.splice(index_remove, 1)
            this.save();
        },
        edit(index) {
            this.alter = true;
            this.cod = index;

            var index_edit = this.cliente.findIndex((x) => x.cod === index);

            this.nomecliente = this.cliente[index_edit].nomecliente;
            this.cpf = this.cliente[index_edit].cpf;
            this.telefone = this.cliente[index_edit].telefone;
            this.email = this.cliente[index_edit].email;
            this.rua = this.cliente[index_edit].rua;
            this.numero = this.cliente[index_edit].numero;
            this.cidade = this.cliente[index_edit].cidade;
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
