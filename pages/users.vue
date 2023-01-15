<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-app>
      <h2 style="color: #424242" class="ml-4">Users</h2>
      <v-breadcrumbs :items="crumbsItems">
        <template #divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <v-row class="pl-4 pr-4 mt-5">
        <v-col>
          <v-card>
            <v-row>
              <v-card-title class="ml-3">List of All Users</v-card-title>
              <v-spacer />
              <v-btn
              v-if="!isNew"
                color="primary"
                class="mt-5 mr-5"
                elevation="0"
                @click="isNew = true"
              >
                New User
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-row>
            <v-card-text>
                <v-tabs color="deep-purple accent-4">
            <v-tab>Lawyers </v-tab>
            <v-tab> Analysts </v-tab>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              dense
              hide-details
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
            <v-tab-item v-for="i in 2" :key="i">
              <v-data-table
                :headers="headers"
                :items="i==1 ? lowyerItems : analystItems"
                :search="search"
                :loading="loading"
              >
              <template #[`item.id`] = "{ index }">
                {{ index + 1 }}
              </template>
              <!-- <template #[`item.status`] = "{ item }">
                <span :class="item.active ? 'active' : 'inactive'">{{ item.active ? 'Active' : 'Inactive' }}</span>
              </template> -->
              </v-data-table>
            </v-tab-item>
            </v-tabs>
            </v-card-text> </v-card>
        </v-col>
        <v-col v-if="isNew" cols="12" md="5" lg="5">
          <v-card>
            <v-row justify="space-between" class="pl-4 pr-4">
              <v-card-title> New User </v-card-title>
              <v-btn
                x-small
                class="mr-3 mt-3"
                color="error"
                fab
                elevation="0"
                dark
                @click="isNew = false"
                ><v-icon>mdi-close</v-icon></v-btn>
            </v-row>
            <validation-observer ref="form">
              <v-card-text class="py-0">
                <v-col class="pb-0">
                  <label contenteditable="true">Names </label>
                  <validation-provider v-slot="{ errors }" rules="required">
                    <v-text-field
                      v-model="userName"
                      :error="errors[0] ? true : false"
                      outlined
                      type="text"
                      dense
                      class="new-group-field"
                    ></v-text-field>
                  </validation-provider>
                  <label>User Phone</label>
                  <validation-provider v-slot="{ errors }" rules="required">
                    <v-text-field
                      v-model="userPhone"
                      :error="errors[0] ? true : false"
                      dense
                      outlined
                      class="new-group-field"
                    ></v-text-field>
                  </validation-provider>
                  <label>User type</label>
                  <validation-provider v-slot="{ errors }" rules="required">
                  <v-select
                    v-model="slctuserType"
                    :error="errors[0] ? true : false"
                    outlined
                    :items="UserTypes"
                    dense
                    class="new-group-field"
                  ></v-select>
                </validation-provider>
                </v-col>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  color="info"
                  elevation="0"
                  :disabled="saveLoading"
                  :loading="saveLoading"
                  @click="submit"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </validation-observer>
          </v-card>
        </v-col>
      </v-row>
    </v-app>
  </template>
  
  <script>
  import { ValidationProvider , ValidationObserver } from 'vee-validate'
  
  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data() {
      return {
        crumbsItems: [
          {
            text: 'Dashboard',
            disabled: false,
            href: '',
          },
          {
            text: 'Home',
            disabled: false,
            href: 'home',
          },
          {
            text: 'Students',
            disabled: true,
            href: 'student',
          },
        ],
        isNew: false,
        headers: [
          {
            text: '#',
            align: 'start',
            sortable: true,
            value: 'id',
          },
          { text: 'Names', value: 'names' },
          { text: 'Phone', value: 'phone' },
        ],
        userName: '',
        userPhone: '',
        loading: false,
        saveLoading: false,
        userItems: [],
        lowyerItems: [],
        analystItems: [],
        UserTypes: [
          {text: 'Lawyer', value: 2},
          {text: 'Analyst', value: 3},
        ],
        search: '',
        slctuserType: '',
      }
    },
  
    mounted() {
      this.getUsers()
    },
    methods: {
      submit() {
        this.saveLoading = true
        this.$axios
          .post('registerUser', {
            names: this.userName,
            phone: this.userPhone,
            password: 'abcdef12',
            userType: this.slctuserType,
          })
          .then((res) => {
            this.getUsers()
            this.$toast.success("New User is saved", {
              position: 'top-right'
            })
            this.userName = ''
            this.userPhone = ''
            this.isNew = false
          })
          .catch(() => {
            this.$toast.error("Error Occured - New User not saved", {
              position: 'top-right'
            })
          })
          .finally(() => {
            this.saveLoading = false
          })
      },
      getUsers() {
        this.loading = true
        this.$axios.get("getUsers")
        .then(res => {
          this.userItems = res.data
          this.lowyerItems = this.userItems.filter((item) => item.userType === '2')
          this.analystItems = this.userItems.filter((item) => item.userType === '3')
          
        })
        .finally(() => {
          this.loading = false
        })
      }
    },
  }
  </script>
  
  
  <style scoped>
  .active {
    padding: 5px 10px;
    border: 1px solid green;
    border-radius: 5px;
  }
  .inactive {
    padding: 5px 10px;
    border: 1px solid red;
    border-radius: 5px;
  }
  </style>