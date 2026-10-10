import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Keyboard,
  Platform,
} from 'react-native';

function ItemCompra({ nome }) {
  return (
    <View style={styles.card}>
      <View style={styles.marcador} />
      <Text style={styles.textoCard}>{nome}</Text>
    </View>
  );
}

export default function App() {
  const [texto, setTexto] = useState('');
  const [itens, setItens] = useState([]);

  function adicionarItem() {
    const itemFormatado = texto.trim();
    if (!itemFormatado) return;

    const novoItem = {
      id: Date.now().toString(),
      nome: itemFormatado,
    };

    setItens([...itens, novoItem]);
    setTexto('');

    if (Platform.OS !== 'web' && Keyboard) {
      Keyboard.dismiss();
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.appContainer}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Lista de Compras</Text>
          <Text style={styles.subtitulo}>CheckPoint 2 • Gabriel Kenishi Furuzawa</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ex: Leite, Arroz, Café..."
            placeholderTextColor="#94A3B8"
            value={texto}
            onChangeText={setTexto}
            onSubmitEditing={adicionarItem}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.botaoAdicionar}
            onPress={adicionarItem}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotao}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={itens}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItemCompra nome={item.nome} />}
          contentContainerStyle={styles.listaContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitulo}>A sua lista está vazia</Text>
              <Text style={styles.emptySubtexto}>
                Digite um produto no campo acima e clique em "Adicionar".
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: '#F8FAFC',
    borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
    borderRightWidth: Platform.OS === 'web' ? 1 : 0,
    borderColor: '#E2E8F0',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  subtitulo: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  formContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 10,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  botaoAdicionar: {
    height: 48,
    backgroundColor: '#0284C7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  listaContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  marcador: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0284C7',
    marginRight: 14,
  },
  textoCard: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
    flex: 1,
  },
  emptyContainer: {
    paddingVertical: 64,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  emptySubtexto: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
});