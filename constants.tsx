
import React from 'react';
import { Language, SavingGoal } from './types';

export const APP_NAME = "SMART BUDGET MANAGEMENT APP (SBM)";

export const DEMO_UPI_IDS = [
  "alex.sterling@oksbi",
  "wealth.manager@paytm",
  "sbm.luxury@axisbank",
  "emergency.fund@icici"
];

export const DEMO_SAVINGS: SavingGoal[] = [
  { id: 's1', name: 'Academic Tuition', purpose: 'School Fee', targetAmount: 15000, currentAmount: 12400, deadline: '2025-08-01', isReminderActive: true },
  { id: 's2', name: 'Emergency Safety Net', purpose: 'Emergency', targetAmount: 20000, currentAmount: 4500, deadline: '2026-01-01', isReminderActive: true, isRecoveryMode: true },
  { id: 's3', name: 'Wealth Portfolio', purpose: 'Investment', targetAmount: 50000, currentAmount: 12000, deadline: '2027-12-31', isReminderActive: false },
];

export const LOCALES: Record<Language, any> = {
  [Language.EN]: {
    welcome: "SMART BUDGET MANAGEMENT APP (SBM)",
    greeting: "Welcome back, ",
    balance: "Liquid Capital",
    savings: "Sacred Reserves",
    earn: "Inflow Expansion",
    travel: "Scout: Tickets",
    groceries: "Scout: Market",
    advisor: "AI Concierge",
    settings: "System Hub",
    health: "Vital Reserves",
    addTransaction: "Log Capital Event",
    transfer: "Wire Assets",
    interests: "Earning Nodes",
    recoveryStrategy: "System Restoration Plan",
    ticketTitle: "Global Travel Comparison",
    groceryTitle: "Essential Price Scouting",
    healthTitle: "Medical Liquidity Check",
    expense: "Expense",
    income: "Income",
    sendMoney: "Send Assets",
    upiId: "Registered UPI Assets"
  },
  [Language.HI]: {
    welcome: "SMART BUDGET MANAGEMENT APP (SBM)",
    greeting: "वापसी पर स्वागत है, ",
    balance: "तरल पूंजी",
    savings: "पवित्र बचत",
    earn: "धन विस्तार",
    travel: "टिकट पुनर्गठन",
    groceries: "बाजार स्काउट",
    advisor: "एआई दरबान",
    settings: "सिस्टम कॉन्फ़िगरेशन",
    health: "महत्वपूर्ण भंडार",
    addTransaction: "पूंजी घटना पंजीकृत करें",
    transfer: "वायर ट्रांसफर",
    interests: "अर्जन नोड्स",
    recoveryStrategy: "सिस्टम बहाली योजना",
    ticketTitle: "वैश्विक टिकट तुलना",
    groceryTitle: "आवश्यक मूल्य स्काउटिंग",
    healthTitle: "चिकित्सा तरलता जांच",
    expense: "व्यय",
    income: "आय",
    sendMoney: "पूंजी भेजें",
    upiId: "पंजीकृत यूपीआई आईडी"
  },
  [Language.ES]: {
    welcome: "SMART BUDGET MANAGEMENT APP (SBM)",
    greeting: "Bienvenido de nuevo, ",
    balance: "Capital Líquido",
    savings: "Reservas Sagradas",
    earn: "Expansión de Ingresos",
    travel: "Búsqueda: Entradas",
    groceries: "Búsqueda: Mercado",
    advisor: "Conserje de IA",
    settings: "Centro del Sistema",
    health: "Reservas Vitales",
    addTransaction: "Registrar Evento de Capital",
    transfer: "Transferir Activos",
    interests: "Nodos de Ganancia",
    recoveryStrategy: "Plan de Restauración del Sistema",
    ticketTitle: "Comparación de Viajes Globales",
    groceryTitle: "Búsqueda de Precios Esenciales",
    healthTitle: "Control de Liquidez Médica",
    expense: "Gasto",
    income: "Ingreso",
    sendMoney: "Enviar Activos",
    upiId: "Activos UPI Registrados"
  },
  [Language.FR]: {
    welcome: "SMART BUDGET MANAGEMENT APP (SBM)",
    greeting: "Bienvenue, ",
    balance: "Capital Liquide",
    savings: "Réserves Sacrées",
    earn: "Expansion des Revenus",
    travel: "Scout : Billets",
    groceries: "Scout : Marché",
    advisor: "Concierge IA",
    settings: "Centre Système",
    health: "Réserves Vitales",
    addTransaction: "Enregistrer un Événement",
    transfer: "Transférer des Activos",
    interests: "Nœuds de Gains",
    recoveryStrategy: "Plan de Restauration du Système",
    ticketTitle: "Comparaison des Voyages",
    groceryTitle: "Scoutisme des Prix Essentiels",
    healthTitle: "Contrôle de Liquidité Médicale",
    expense: "Dépense",
    income: "Revenu",
    sendMoney: "Envoyer des Actifs",
    upiId: "UPI Enregistrés"
  }
};

export const MOCK_HISTORY = [
  { id: '1', type: 'expense', category: 'Luxury Market', amount: 1250, date: '2025-05-20', description: 'Weekly Groceries - Dmart Selection' },
  { id: '2', type: 'income', category: 'Professional Fee', amount: 8000, date: '2025-05-18', description: 'Consultancy Retainer Inflow' },
  { id: '3', type: 'expense', category: 'Travel Node', amount: 450, date: '2025-05-17', description: 'Flight Ticket - SkyLink Optimized' },
];

export const SIDE_INCOME_DATA = [
  {
    id: "delivery",
    category: "Delivery & Gig Nodes",
    platforms: ["Rapido", "Swiggy", "Zomato", "Zepto"],
    description: "Earn immediately by joining high-demand logistics networks. These platforms allow flexible scheduling for quick liquidity.",
    icon: <i className="fas fa-motorcycle"></i>,
    aiAdvice: "Zepto and Swiggy are currently offering a 1.2x 'Rainy Day' bonus in your area. Rapido is best for peak-hour commuter nodes."
  },
  {
    id: "teaching",
    category: "Academic & Tutoring Nodes",
    platforms: ["Chegg", "Unacademy", "BYJU'S", "Offline Tutor"],
    description: "Monetize your intellectual assets. Academic mentoring provides stable, high-value hourly income compared to delivery.",
    icon: <i className="fas fa-chalkboard-teacher"></i>,
    aiAdvice: "Offline tutoring in your local sector has a 20% higher margin than digital platforms. Chegg is optimal for overnight global sessions."
  }
];

export const PRICE_COMPARISONS = {
  tickets: [
    { mode: 'Flight', price: 450, provider: 'Indigo', best: false },
    { mode: 'Train', price: 65, provider: 'Rajdhani', best: true },
    { mode: 'Bus', price: 40, provider: 'RedBus', best: false },
  ],
  groceries: [
    { item: 'Milk (1L)', dmart: 55, bigbazaar: 58, amazon: 62 },
    { item: 'Rice (5kg)', dmart: 480, bigbazaar: 450, amazon: 490 },
    { item: 'Potatoes (1kg)', dmart: 22, bigbazaar: 28, amazon: 35 },
  ]
};
