import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
    id: number;
    animation: AnimationObject;
    title: string;
    subtitle: string;
    titleColor: string;
    subtitleColor: string;
    backgroundColor: string;
}

const data: OnboardingData[] = [
    {
        id: 1,
        animation: require('../app/assets/animations/Location.json'),
        title: 'Effortless & Reliable\nSchool Bus Tracking',
        subtitle: 'Welcome to our dedicated school bus\ntracking  app! Experience the convenienceof real-time bus tracking at your fingertips.',
        titleColor: '#000000',
        subtitleColor: '#959595',
        backgroundColor: '#fff'
    },
    {
        id: 2,
        animation: require('../app/assets/animations/driver.json'),
        title: 'Driver & Vehicle\nProfile Details',
        subtitle: 'Access detailed information about your child’s driver and vehicle, including ratings, experience, and safety records for complete peace of mind.',
        titleColor: '#000',
        subtitleColor: '#000',
        backgroundColor: '#FEC006'
    },
    {
        id: 3,
        animation: require('../app/assets/animations/logo.json'),
        title: 'Effortless & Reliable School Bus Tracking ',
        subtitle: 'Welcome to our dedicated school bus tracking  app! Experience the convenience of real-time bus tracking at your fingertips.',
        titleColor: '#fff',
        subtitleColor: '#fff',
        backgroundColor: '#266FEF'
    },
];

export default data;