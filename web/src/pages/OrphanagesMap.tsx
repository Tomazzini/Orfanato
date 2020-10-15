import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi'; 
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import api from '../services/api';
import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcons';


interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    // lista de orfanatos vazio -- conceito de estado
    // desestruturar o array de orfanatos
    //const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    //console.log(orphanages);

    // chamada da api
    useEffect(() => {
        api.get('orphanages').then(response => {
          console.log(response.data);
        });
      }, []);
    
    //useEffect(() => {
    //    api.get('/orphanages').then(response => {
    //        
    //        setOrphanages(response.data);
    //        console.log(response);
    //    });
    //}, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Guaíba</strong>
                    <span>Rio Grande do Sul</span>
                </footer>
            </aside>

            <Map 
                center={[-30.0883628,-51.3365315]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
                <TileLayer 
                     //url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {/* percorre a lista de orfanatos e renderiza na tela    */}
                {/* {orphanages.map(orphanage => { */}
                    // return (
                        <Marker
                            icon={mapIcon}
                            position={[-30.0883628,-51.3365315]}
                            // position={[orphanage.latitude,orphanage.longitude]}
                            // key={orphanage.id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {/* {orphanage.name} */} pão dos pobres
                                <Link to="/orphanages/9">
                                {/* <Link to={`/orphanages/${orphanage.id}`}> */}
                                    <FiArrowRight size={20} color="#fff"/>
                                </Link>
                            </Popup>
                    
                        </Marker>    
                    )
                {/* })}  */}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    )
}

export default OrphanagesMap;