<template>
    <v-main class="bg-grey-lighten-3">
        <v-container>

            <v-row>

                <v-col cols="12" sm="12">

                    <v-sheet min-height="100vh" rounded="lg" class="pa-12">
                        
                        <v-row justify="space-around">
                            <v-col cols="5" v-if="cliente.length != 0">
                                <h3>Todos os clientes</h3>
                                <v-card width="400" v-for="i in cliente" :key="i" class="ma-3 bg-grey-lighten-3">
                                    <div class="d-flex flex-no-wrap justify-space-between">
                                        <div>
                                            <v-card-title class="text-h5">
                                                {{ i.nomecliente.toUpperCase() }}
                                            </v-card-title>
                                            <v-card-subtitle>Código #{{ i.cod }}</v-card-subtitle>
                                            <v-card-text>
                                                <p>CPF: {{ i.cpf }}</p>
                                                <p>email: {{ i.email }}</p>
                                                <p>Telefone: {{ i.telefone }}</p>
                                                <p>Rua: {{ i.rua }} N°: {{ i.numero }}</p>
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

                                <div class="ml-7 mt-15">
                                    <h3> Pesquisar por código do cliente </h3>
                                    <v-row>
                                        <v-col cols="10">
                                            <v-form ref="form">
                                                <v-text-field v-model="pesq" label="Código do cliente" variant="underlined"
                                                    required id="pesq"></v-text-field>


                                            </v-form>

                                        </v-col>
                                        <v-col cols="auto">
                                            <v-btn icon="mdi-magnify" size="small" color="primary"
                                                @click="pesquisar()"></v-btn>
                                        </v-col>
                                    </v-row>

                                    <p v-if="found.length != 0"><b>Pedido #{{ (found.cod) }}<br></b> <b>Cliente: </b>{{ (found.nomecliente).toUpperCase() }}/ <b>CPF:</b> {{ found.cpf }}<br>
                                        <b>Rua: </b>{{ found.rua }} <b>N°</b> {{ found.numero }}, {{ found.cidade }}<br>
                                        <b>Telefone:</b> {{ found.telefone }}/ <b>Email: </b>{{ found.email }}</p>
                                    <p v-if="noresults">Nenhum cliente cadastrado com esse código</p>
                                </div>

                            </v-col>
                            <v-col cols="5" v-if="cliente.length == 0">
                                <v-card width="400" class="ma-3 bg-grey-lighten-3">
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



                                <div class="ml-7 mt-15">
                                    <h3> Pesquisar por nome do cliente </h3>
                                    <v-row>
                                        <v-col cols="10">
                                            <v-form ref="form">
                                                <v-text-field v-model="pesq" label="Código do cliente" variant="underlined"
                                                    required id="pesq"></v-text-field>


                                            </v-form>

                                        </v-col>
                                        <v-col cols="auto">
                                            <v-btn icon="mdi-magnify" size="small" color="primary"
                                                @click="pesquisar()"></v-btn>
                                        </v-col>
                                    </v-row>

                                    <p v-if="found.length != 0"><b>Pedido #{{ (found.cod) }}</b><br> <b>Cliente: </b>{{ (found.nomecliente).toUpperCase() }}/ <b>CPF:</b> {{ found.cpf }}<br>
                                        <b>Rua: </b>{{ found.rua }} <b>N°</b> {{ found.numero }}, {{ found.cidade }}<br>
                                        <b>Telefone:</b> {{ found.telefone }}/ <b>Email: </b>{{ found.email }}

                                    </p>
                                    <p v-if="noresults">Nenhum cliente cadastrado com esse código</p>
                                </div>



                            </v-col>

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
        cod: '',
        pesq: '',
        found: [],
        i:1,
        noresults: false
    }),

    methods: {
        save() {
            const parsed = JSON.stringify(this.cliente);
            localStorage.setItem('cliente', parsed);
        },
        addList() {

            
            if (this.alter == false) {
                this.cliente.push({ cod: this.i++, nomecliente: this.nomecliente, cpf: this.cpf, email: this.email, telefone: this.telefone, rua: this.rua, numero: this.numero, cidade: this.cidade })
               
                this.save();
            } else {
                var index_edit = this.cliente.findIndex((x) => x.cod === this.cod);
                this.cliente[index_edit] = { cod: this.cod, nomecliente: this.nomecliente, cpf: this.cpf, email: this.email, telefone: this.telefone, rua: this.rua, numero: this.numero, cidade: this.cidade }
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
            this.alter=false;


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
        pesquisar() {
            var search = this.cliente.find(e => e.cod == this.pesq);

            if (search != undefined) {
                this.found = search
                this.noresults = false
            } else {
                this.noresults = true
                this.found = []
            }

        },
        async validate() {
            const { valid } = await this.$refs.form.validate()

            if (valid) this.addList()
        },
        reset() {
            this.$refs.form.reset()
        },




    },
    mounted() {
        if (localStorage.getItem('cliente')) {
            try {
                this.cliente = JSON.parse(localStorage.getItem('cliente'));
            } catch (e) {
                localStorage.removeItem('cliente');
            }

        }
    },
}
</script>

<style>
#pesq {
    text-transform: uppercase;
}
</style>
