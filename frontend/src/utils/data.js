import{
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
    LuRefreshCcw,
} from "react-icons/lu"

export const SIDE_MENU_DATA=[
    {
        id:"01",
        label:"Dashboard",
        icon:LuLayoutDashboard,
        path:"/dashboard"
    },

    {
        id:"06",
        label:"BudgetCycle",
        icon:LuRefreshCcw,
        path:"/budgetCycle"
    },

    {
        id:"02",
        label:"Income",
        icon:LuWalletMinimal,
        path:"/income"
    },
        {
        id:"03",
        label:"Expense",
        icon:LuHandCoins,
        path:"/expense"
    },

    


        {
        id:"06",
        label:"logout",
        icon:LuLogOut,
        path:"logout"
    },
]