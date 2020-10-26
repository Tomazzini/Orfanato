import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';
import api from '../services/api';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}

export default function OrphanagesMap() {
    const navigation = useNavigation();

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    // chamada da api
    useFocusEffect(() => {
      api.get('/orphanages').then(response => {
        setOrphanages(response.data);
      });
    });

    function handleNavigateToOrphanagesDetails(id: number) {
        navigation.navigate('OrphanagesDetails', { id });       
    }

    function handleNavigateToCreateOrphanage() {
      navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
            latitude: -30.0883628,
            longitude: -51.3365315,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
            }}
          >  
            {orphanages.map(orphanage => {
              return (
                <Marker 
                  key={orphanage.id}
                  icon={mapMarker}
                  calloutAnchor={{
                    x: 2.7,
                    y: 0.8,
                  }}
                  coordinate={{
                    latitude: -30.0883628,
                    //latitude: orphanage.latitude,
                    longitude: -51.3365315,
                    //longitude: orphanage.longitude,
                  }}
                >
                  <Callout tooltip onPress={() => handleNavigateToOrphanagesDetails(orphanage.id)}>
                    <View style={styles.calloutContainer}>
                      <Text style={styles.calloutText}>{orphanage.name}</Text>
                    </View>
                  </Callout>  
            </Marker>
              )
            })}
          </MapView>

      <View style={styles.footer}>
        <Text style={styles.FooterText}>{orphanages.length} Orfanatos encontrados</Text>  

        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage} >
          <Feather name="plus" size={20} color="#fff"/>
        </RectButton>    
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    
    calloutContainer: {
      width: 160,
      height: 46,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
  
    calloutText: {
      fontFamily: 'Nunito_700Bold',
      color: '#0089a5',
      fontSize: 14,
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
  
    },
  
    FooterText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3',
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
});