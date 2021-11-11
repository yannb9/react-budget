import AdWords from './icons/AdWords';
import Calendar from './icons/Calendar';
import Budget from './icons/Budget';

const Data = [
    {
      title: 'Display ads - Google Adwords',
      type: 'Display',
      icon: <AdWords />,
      isBudget:true,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    {
      title: 'Organising event',
      type:'Events',
      icon: <Calendar />,
      isBudget:false,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    {
      title: 'Paid reviews',
      type:'Paid Search',
      icon: <Budget /> ,
      isBudget:true,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    }
  ]

  export default Data;