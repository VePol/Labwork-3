import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { useApi, DetailsResult } from '../hooks/useApi'; // Import useApi and DetailsResult

// Import Ion icons if not already imported
import { starHalfOutline } from 'ionicons/icons';

interface DetailsPageProps extends RouteComponentProps<{
    id: string;
}> {}

const Details: React.FC<DetailsPageProps> = ({ match }) => {
    const { getDetails } = useApi();
    const [information, setInformation] = useState<DetailsResult | null>(null);

    // Ensure `useIonViewWillEnter` is imported if used here

    // Correctly use `useIonViewWillEnter` hook
    useIonViewWillEnter(async () => {
        const id = match.params.id;
        const data = await getDetails(id);
        setInformation(data);
        console.log("🚀 ~ file: Details.tsx:26 ~ useIonViewWillEnter ~ data", data);
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/movies' />
                    </IonButtons>
                    <IonTitle>{information?.Genre}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {information && (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{information.Title}</IonCardTitle>
                            <IonCardSubtitle>{information.Year}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonImg src={information.Poster} />
                            <IonItem lines="none">
                                <IonIcon icon={starHalfOutline} slot="start" color="warning" />
                                <IonLabel>{information.imdbRating}</IonLabel>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Details;