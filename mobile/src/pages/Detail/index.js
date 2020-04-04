import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Linking, TextInput } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { Component } from 'react';

export default function Detail() {


  const navigation = useNavigation();
  const route = useRoute();
  const [text, setText] = useState('');
  const [textValor, setTextValor] = useState('');

  const incident = route.params.incident;
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;




  function navigateBack() {
    navigation.goBack()
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`https://api.whatsapp.com/send?phone=${incident.whatsapp}&text=${message}`);

  }

  function helpNow() {
    alert('teste');
  }

  function doarOutroValor() {
    var valida = true;
    if(text == ''){
      alert('informe o nome');
      valida = false;
    }
    else if(textValor == '') {
      alert('informe o valor');
      valida = false;
    }

    if(valida){
      alert('Nome do Doador: '+ text+'\n Novo valor:'+textValor);
      

    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.incident, styles.scroll}>
          <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

          <Text style={styles.incidentProperty}>E-mail</Text>
          <Text style={styles.incidentValuey}>{incident.email}</Text>

          <Text style={styles.incidentProperty}>Whatsapp</Text>
          <Text style={styles.incidentValuey}>{incident.whatsapp}</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(incident.value)}
          </Text>

          <View>
            <Text onPress={doarOutroValor}>Doar outro valor</Text>
          </View>
          <View>
            <TextInput placeholder='Digite seu nome' value={text} onChangeText={text => setText(text)} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
            <TextInput placeholder='Digite o valor' value={textValor} onChangeText={textValor => setTextValor(textValor)} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
            <View style={styles.actions}>
              <TouchableOpacity style={styles.action} onPress={doarOutroValor}>
                <Text style={styles.actionText}>Doar outro valor</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Seja um herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}
