import { AnimationObject } from "react-native-reanimated";

export interface OnboardingData {
    id: number;
    animation: AnimationObject;
    title: string;
    subtitle: string;
    backgroundColor: string;
    titleColor: string;
    subtitleColor: string;
}

const data: OnboardingData[] = [
    {
        id: 1,
        animation: require('../assets/animations/LocationPerson.json'),
        title: 'Effortless & Reliable\nSchool Bus Tracking',
        subtitle: 'Welcome to our dedicated school bus\ntracking  app! Experience the convenience\nof real-time bus tracking at your fingertips.',
        backgroundColor: '#fff',
        titleColor: '#000',
        subtitleColor: '#959595',
    },
    {
        id: 2,
        animation: require('../assets/animations/Chat.json'),
        title: 'Driver & Parent\nConnections',
        subtitle: 'Instantly message or call your child’s\nschool bus driver and connect with other\nparents for direct communication\nand real-time updates.',
        backgroundColor: '#D4E2FB',
        titleColor: '#000F29',
        subtitleColor: '#4C5058',
    },
    {
        id: 3,
        animation: require('../assets/animations/Profile.json'),
        title: 'Driver & Vehicle\nProfile Details',
        subtitle: 'Access detailed information about your\nchild’s driver and vehicle, including ratings,\nexperience, and safety records for complete\npeace of mind and many more features.',
        backgroundColor: '#fff',
        titleColor: '#000',
        subtitleColor: '#959595',
    },
]

export default data;