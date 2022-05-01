import { useContext, useState } from 'react';
import { MapContext, PlacesContext } from "../context";
import { Feature } from "../interfaces/places";
import { LoadingPlaces } from './LoadingPlaces';

export const SearchResult = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);

  const [activeId, setActiveId] = useState('');

  const onPlaceclick = (place: Feature) => {
    const [lng, lat] = place.center;
    setActiveId(place.id);

    map?.flyTo({
      zoom: 15,
      center: [lng, lat],
    })
  };

  const getRoute = (place: Feature) => {
    if (!userLocation) return;
    const [lng, lat] = place.center;
    getRouteBetweenPoints(userLocation, [lng, lat]);
  };

  if (isLoadingPlaces) {
    return (
      <LoadingPlaces />
    );
  };

  if (places.length === 0) {
    return (<></>);
  }

  return (
    <ul
      className="list-group mt-3"
      style={{
        maxHeight: '50vh',
        overflow: 'auto',
      }}
    >
      {
        places.map(place => (
          <li
            key={place.id}
            className={`list-group-item list-group-item-action pointer ${activeId === place.id ? 'active' : ''}`}
            onClick={() => onPlaceclick(place)}
          >
            <h6>{place.text_es}</h6>
            <p
              className=""
              style={{
                fontSize: '12px',
              }}
            >
              {place.place_name}
            </p>
            <button
              className={`btn btn-sm ${activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`}
              onClick={() => getRoute(place)}
            >
              Addresses
            </button>
          </li>
        ))
      }
    </ul>
  );
};
