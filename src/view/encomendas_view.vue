<template>
    <v-main class="bg-grey-lighten-3">
        <v-container>
            <v-row>

                <v-col cols="12" sm="12">
                    <v-sheet min-height="70vh" rounded="lg" class="pa-12">
                        <v-row justify="space-around">


                            <v-col cols="5" v-if="lista.length != 0">
                                <h3>Todas as encomendas</h3>
                                <v-card width="400" v-for="i in lista" :key="i" class="ma-3 bg-grey-lighten-3">
                                    <div class="d-flex flex-no-wrap justify-space-between">
                                        <div>
                                            <v-card-title class="text-h5">
                                                Pedido n° #{{ i.cod }}
                                            </v-card-title>

                                            <v-card-subtitle> Data de entrega: {{ i.data }}</v-card-subtitle>
                                            <v-card-text>
                                                <h3>{{ (i.cliente).toUpperCase() }}</h3>
                                                <p>{{ i.fruta }} x {{ i.qtd }}</p>

                                                <p>Endereço de entrega: {{ i.rua }} N° {{ i.numero }}</p>
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
                                <div class="ml-3 mt-15">
                                    <h3> Pesquisar por código do pedido </h3>
                                    <v-row>
                                        <v-col cols="10">
                                            <v-form ref="form">
                                                <v-text-field v-model="pesq" label="Código do pedido" variant="underlined"
                                                    required id="pesq"></v-text-field>


                                            </v-form>

                                        </v-col>
                                        <v-col cols="auto">
                                            <v-btn icon="mdi-magnify" size="small" color="primary"
                                                @click="pesquisar()"></v-btn>
                                        </v-col>
                                    </v-row>

                                    <p v-if="found.length != 0"> <b>Pedido N° #{{ found.cod }}</b><br>
                                    <b>Cliente: </b> {{ found.cliente }}<br>
                                    <b>Fruta encomendada: </b> {{ found.fruta }}/ Quantidade: {{
                                        found.qtd }}<br>
                                        <b>Data de entrega:</b> {{ found.data }}
                                    </p>
                                    <p v-if="noresults">Nenhuma encomenda com esse número de pedido</p>

                                </div>
                            </v-col>
                            <v-col cols="5" v-if="lista.length == 0">
                                <v-card width="400" class="bg-grey-lighten-3">
                                    <div>

                                        <v-card-title class="text-h8">
                                            Nenhuma encomenda foi realizada
                                        </v-card-title>

                                        <v-avatar class="ma-3" size="125" rounded="0">
                                            <v-img src="../../public/encomenda.png"></v-img>
                                        </v-avatar>




                                    </div>
                                </v-card>
                                <div class="ml-3 mt-15">
                                    <h3> Pesquisar por código do pedido </h3>
                                    <v-row>
                                        <v-col cols="10">
                                            <v-form ref="form">
                                                <v-text-field v-model="pesq" label="Código do pedido" variant="underlined"
                                                    required id="pesq"></v-text-field>
                                            </v-form>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-btn icon="mdi-magnify" size="small" color="primary"
                                                @click="pesquisar()"></v-btn>
                                        </v-col>
                                    </v-row>

                                    <p v-if="found.length != 0"> <b>Pedido  N° #{{ found.cod }}</b><br>
                                    <b>Cliente: </b> {{ found.cliente }}<br>
                                    <b>Fruta encomendada: </b> {{ found.fruta }}/ Quantidade: {{
                                        found.qtd }}<br>
                                        <b>Data de entrega:</b> {{ found.data }}
                                    </p>
                                    <p v-if="noresults">Nenhuma encomenda com esse número de pedido</p>

                                </div>
                            </v-col>


                            <v-col cols="5">
                                <v-form ref="form">
                                    <v-select v-model="select" :items="frutas" :rules="qtdRules" item-title="item"
                                        item-value="cod" label="Selecione uma fruta" no-data-text="Nenhuma fruta cadastrada"></v-select>

                                    <v-select v-model="select2" :items="cliente" :rules="qtdRules" item-title="nomecliente"
                                        item-value="cod" label="Selecione um cliente" no-data-text="Nenhum cliente cadastrado"></v-select>

                                    <v-text-field v-model="qtd" :rules="qtdRules" label="Quantidade"
                                        required></v-text-field>

                                    <v-text-field v-model="data" type="data" :rules="qtdRules" label="Data de entrega"
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

        qtdRules: [
            v => !!v || 'Preenchimento obrigatório',
        ],
        select: '',
        select2: '',
        data: '',
        qtd: '',
        alter: false,
        lista: [],
        cod: '',
        frutas: [],
        cliente: [],
        found: [],
        pesq: '',
        name: '',
        i:1
    }),

    methods: {
        save() {
            const parsed = JSON.stringify(this.lista);
            localStorage.setItem('encomendas', parsed);
        },
        addList() {

            //procura index no array
            var index_cliente = this.cliente.findIndex((x) => x.cod === this.select2);
            var index_fruta = this.frutas.findIndex((x) => x.cod === this.select);


            if (this.alter == false) {
                this.lista.push({cod: this.i++, fruta: this.frutas[index_fruta].item, cod_fruta: this.select, cliente: this.cliente[index_cliente].nomecliente, cod_cliente: this.select2,  qtd: this.qtd, data: this.data, rua: this.cliente[index_cliente].rua, numero: this.cliente[index_cliente].numero, cidade: this.cliente[index_cliente].cidade })
                this.save();
            } else {
                var index_edit = this.lista.findIndex((x) => x.cod === this.cod);
                this.lista[index_edit] = { fruta: this.frutas[index_fruta].item, cod_fruta: this.select, cliente: this.cliente[index_cliente].nomecliente, cod_cliente: this.select2, cod: this.cod, qtd: this.qtd, data: this.data, rua: this.cliente[index_cliente].rua, numero: this.cliente[index_cliente].numero, cidade: this.cliente[index_cliente].cidade }
                this.alter = true;
                this.save();
            }


            this.select = null
            this.select2 = null
            this.qtd = null
            this.data = null
            this.alter = false
        },
        removeItem(index) {
            var index_remove = this.lista.findIndex((x) => x.cod === index);

            this.lista.splice(index_remove, 1);
            this.save();

        },
        edit(index) {
            this.alter = true;


            var index_edit = this.lista.findIndex((x) => x.cod === index);
            this.cod = index;
            this.select = this.lista[index_edit].cod_fruta;
            this.select2 = this.lista[index_edit].cod_cliente;
            this.qtd = this.lista[index_edit].qtd;
            this.data = this.lista[index_edit].data;



        },
        pesquisar() {
            console.log('cod', this.pesq)
            var search = this.lista.find(e => e.cod == this.pesq);
            

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
        if (localStorage.getItem('encomendas')) {
            try {
                this.lista = JSON.parse(localStorage.getItem('encomendas'));
            } catch (e) {
                localStorage.removeItem('encomendas');
            }
        }

        if (localStorage.getItem('frutas')) {
            try {
                this.frutas = JSON.parse(localStorage.getItem('frutas'));
            } catch (e) {
                localStorage.removeItem('frutas');
            }
        }
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