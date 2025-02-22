'use client'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "fr", // Default language
  interpolation: {
    escapeValue: false, // React already escapes values to prevent XSS
  },
  resources: {
    en: {
      translation: {
        // Login
        email: "Email",
        password: "Password",
        forgotPassword: "Forgot password?",
        
        // Dashboard
        dashboard: "Dashboard", //done
        performanceMatrix: "PERFORMANCE MATRIX",//done
        projects: "Projects",//done
        assignGoals: "Assign Goals", //done
        assignGoal: "Assign Goal",//done
        goalAssessment: "Goal Assessment", //done
        goalName: "Goal Name", //done
        department: "Department", //done
        employees: "Employees", //done
        employee: "Employee",
        reports: "Reports", //done
        completed: "Completed",//done
        inProgress: "In Progress",//done
        notStarted: "Not Started",//done
        thanLastMonth: "Than last month",//done
        welcomeBack: "Welcome back", //done
        signOut: "Sign out", //done
        averagePerformance: "AVERAGE PERFORMANCE", //done
        selectDate: "Select Date", //done
        selectStaff: "Select a Staff", //done
        staff: "Staff", //done
        dateFrom: "Date From",//done
        dateTo: "Date To",//done
        generalPerformance: "General Performance",//done
        lastUpdated: "Last Updated",//done
        goalTitle: "Goal Title",
        assignedDate: "Assigned Date",
        goalScore: "Goal Score",
        endDate: "End Date",
        detail: "Detail",
        rowsPerPage: "Rows per Page",
        goals: "Goals", //done
        goalCategory: "Goal Category",
        goalStatus: "Goal Status",
        assessNewGoals: "Assess New Goals",
        remark: "Remark",
        access: "Access", //done
        departmentName: "Department Name",
        edit: "Edit",
        delete: "Delete",
        departmentManager: "Department Manager",
        numberOfStaff: "Number of Staff",
        users: "Users",
        firstName: "First Name",//done
        role: "Role",
        emailAddress: "Email Address", //done
        balancedScorecard: "Balanced Scorecard",
        operationalEfficiency: "Operational Efficiency",
        strategicPerformance: "Strategic Performance",
        enterpriseWideGoals: "Enterprise Wide Goals",
        badges: "Badges", 
        financial: "Financial",//done 
        humanRelationship: "Human Relationship",//done
        customerCentred: "Customer Centred",//done
        processAndInnovation: "Process and Innovation",//done
        internalProcessingAndInnovation: "Internal processing and innovation",
        currentDate: "Current Date",
        topPerformerAward: "Top Performer Award",
        awardsDescription: "These awards celebrate exceptional performance and dedication to the Organization.",//done
        goldBadges: "Gold Badges",//done
        silverBadges: "Silver Badges",//done
        bronzeBadges: "Bronze Badges",//done
        fullName: "Full Name",
        submit: "Submit",
        addNewEmployee: "Add a New Employee",//done
        qualityOfWork: "Quality of Work Done",//done
        productivity: "Productivity",//done
        procedure: "Procedure",//done
        communication: "Communication",//done
        reliability: "Reliability",//done
        teamWork: "Team Work",//done
        creativity: "Creativity",//done
        goalRating: "Goal Rating",
        comment: "Comment",
        target: "Target",//done
        priorityLevel: "Priority Level",//done
        description: "Description", //done
        assignNewGoal: "Assign a New Goal",//done
        newDepartment: "New Department",
        assessingRatingGoal: "ASSESING & RATING GOAL",//done
        high: "High",//dome
        low: "Low",//done
        medium: "Medium",//done
        loading: "Loading",//done
        weak: "Weak",//done
        average: "Average",//done
        good: "Good",//done
        veryGood: "Very Good",//done
        belowExpectations: "Below Expectations",
        meetsExpectations: "Meets Expectations",
        exceedsExpectations: "Exceeds Expectations",
        outstanding: "Outstanding",
        goal: "Goal",
        generalManager: "General Manager",
        manager: "Manager",
        signUp: "Sign Up",
        dontHaveAccount: "Don't have an account?",
        enterEmailForVerification: "Enter email for Verification",
        return: "Return",
        home: "Home",
        setNewPassword: "Set your New Password",
        checkEmailForToken: "Check your email for a verified token",
        token: "Token",
        getStarted: "Get Started",
        companyName: "Company Name",
        country: "Country",
        subscription: "Subscription",
        select: "Select",
        free: "Free",
        basic: "Basic",
        standard: "Standard",
        custom: "Custom",
        address: "Address",
        contact: "Contact",
        alreadyHaveAccount: "Already having an Account?",
        loginIn: "Login In",
        activateAccount: "Activate your Account",
        enterVerificationToken: "Enter the verification token from your email",
        doYouWantToReturn: "Do you want to return ?",
        or: "Or",
        typeEmailHere: "Type email here",
        enterPassword: "Enter password",
        goalScorePercentage: "Goal Score Percentage",
        balanceScorecard: "Balance Scorecard",
        systemGoals: "System Goals",
        organizationalDepartment: "Organizational Department",
        lastSelected: "Last Selected",
        scorePercentage: "Score Percentage",

        //infocards
        goalId: "Goal ID",  
        deadline: "Deadline",  
        status: "Status",  
        currentProgress: "Current Progress",  
        target: "Target",  
        enterProgress: "Enter Progress",  
        submitProgress: "Submit Progress",
        updateGoalProgress: "Update Goal Progress",  
        selectProjectToUpdateProgress: "Select project to update progress",  
        organizationalEmployees: "Organizational Employees",

      },
    },
    fr: {
      translation: {
        // Login
        email: "Messagerie électronique",
        password: "Mot de passe",
        forgotPassword: "Mot de passe oublié ?",
        
        // Dashboard
        dashboard: "Tableau de Bord",
        projects: "Projets",
        performanceMatrix: "MATRICE DE PERFORMANCE",
        assignGoals: "Attribuer des Objectifs",
        assignGoal: "Attribuer des Objectif",
        goalAssessment: "Évaluation des Objectifs",
        goalName: "Nom de l'objectif",
        department: "Département",
        employees: "Employés",
        employee: "Employé",
        reports: "Rapports",
        completed: "Terminé",
        inProgress: "En Cours",
        notStarted: "Non Commencé",
        thanLastMonth: "Par Rapport Au Mois Dernier",
        welcomeBack: "Bon Retour",
        signOut: "Se Déconnecter",
        averagePerformance: "Performance Moyenne",
        selectDate: "Une Date",
        selectStaff: "Sélectionner un membre du personnel",
        staff: "Personnel",
        dateFrom: "A partir de (date)",
        dateTo: "Jusqu'au (date)",
        generalPerformance: "Performance Générale",
        lastUpdated: "Dernière Mise à Jour",
        goalTitle: "Titre de l'Objectif",
        assignedDate: "Date d'Attribution",
        goalScore: "Score de l'Objectif",
        endDate: "Date de Fin",
        detail: "Détail",
        rowsPerPage: "Lignes par Page",
        goals: "Objectifs",
        goalCategory: "Catégorie d'Objectif",
        goalStatus: "Statut de l'Objectif",
        assessNewGoals: "Évaluer de Nouveaux Objectifs",
        remark: "Remarque",
        access: "Accès",
        departmentName: "Nom du Département",
        edit: "Modifier",
        delete: "Supprimer",
        departmentManager: "Responsable de Département",
        numberOfStaff: "Nombre de Personnel",
        users: "UTILISATEURS",
        firstName: "Prénom",
        role: "Rôle",
        emailAddress: "Adresse E-mail",
        balancedScorecard: "Tableau de Bord Équilibré",
        operationalEfficiency: "Efficacité Opérationnelle",
        strategicPerformance: "Performance Stratégique",
        enterpriseWideGoals: "Objectifs à l’échelle de l’entreprise.",
        badges: "Badges",
        financial: "Financier",
        humanRelationship: "Relations Humaines",
        customerCentred: "Centré sur le Client",
        processAndInnovation: "Processus et Innovation",
        internalProcessingAndInnovation: "Traitement interne et innovation",
        currentDate: "Date Actuelle",
        topPerformerAward: "Prix du Meilleur Performeur",
        awardsDescription: "Ces Prix Célèbrent une Performance Exceptionnelle et un Dévouement à l'Organisation.",
        goldBadges: "Badges d'Or",
        silverBadges: "Badges d'Argent",
        bronzeBadges: "Badges de Bronze",
        fullName: "Nom Complet",
        submit: "Soumettre",
        addNewEmployee: "Ajouter un Nouvel Employé",
        qualityOfWork: "Qualité du Travail Effectué",
        productivity: "Productivité",
        procedure: "Procédure",
        communication: "Communication",
        reliability: "Fiabilité",
        teamWork: "Travail d'Équipe",
        creativity: "Créativité",
        goalRating: "Évaluation de l'Objectif",
        comment: "Commentaire",
        target: "Cible",
        priorityLevel: "Niveau de Priorité",
        description: "Description",
        assignNewGoal: "Attribuer un Nouvel Objectif",
        newDepartment: "Nouveau Département",
        assessingRatingGoal: "Évaluation et Natation des Objectifs",
        high: "Élevé",
        low: "Bas",
        medium: "Moyenne",
        loading: "Chargement",
        weak: "Faible",
        average: "Moyenne",
        good: "Bon",
        veryGood: "Très Bon",
        belowExpectations: "En dessous des attentes",
        meetsExpectations: "Répond aux attentes",
        exceedsExpectations: "Dépasse les attentes",
        outstanding: "Exceptionnel",
        goal: "Objectif",
        generalManager: "Directeur Général",
        manager: "Directeur",
        signUp: "S'inscrire",
        dontHaveAccount: "Vous n'avez pas de compte ?",
        enterEmailForVerification: "Entrez l'email pour la vérification",
        return: "Retour",
        home: "Accueil",
        setNewPassword: "Définissez votre nouveau mot de passe",
        checkEmailForToken: "Vérifiez votre email pour un jeton vérifié",
        token: "Jeton",
        getStarted: "Commencer",
        companyName: "Nom de l'entreprise",
        country: "Pays",
        subscription: "Abonnement",
        select: "Sélectionner",
        free: "Gratuit",
        basic: "Basique",
        standard: "Standard",
        custom: "Personnalisé",
        address: "Adresse",
        contact: "Contact",
        alreadyHaveAccount: "Vous avez déjà un compte ?",
        loginIn: "Se connecter",
        activateAccount: "Activez votre compte",
        enterVerificationToken: "Entrez le jeton de vérification de votre email",
        doYouWantToReturn: "Voulez-vous revenir ?",
        or: "Ou",
        typeEmailHere: "Entrez l'email ici",
        enterPassword: "Entrez le mot de passe",
        organizationalDepartment: "Département organisationnel",
        goalScorePercentage: "Pourcentage du score des objectifs",
        lastSelected: "Dernier Sélectionné",
        scorePercentage: "Pourcentage du score",

        //infocards
        goalId: "ID de l'objectif",  
        deadline: "Date limite",  
        status: "Statut",  
        currentProgress: "Progrès actuel",  
        target: "Cible",  
        enterProgress: "Saisir le progrès",  
        submitProgress: "Soumettre le progrès", 
        updateGoalProgress: "Mettre à jour la progression de l'objectif",
        selectProjectToUpdateProgress: "Sélectionnez un projet pour mettre à jour la progression",
        organizationalEmployees: "Employés organisationnels",
      },
    },
  },
});

export default i18n;
