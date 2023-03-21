const SET_DATE = 'SET_DATE'
const SET_MINI_DATE = 'SET_MINI_DATE'
const MENU_MODAL_OPEN = 'MENU_MODAL_OPEN'
const OPEN_ALERT_BEFORE_DELETE = 'ALERT_MODAL_OPEN'
const SELECTED_VIEW = 'SELECTED_VIEW'
const OPEN_RIGHT_FORM = 'OPEN_RIGHT_FORM'

export function calendarReducer(state, action) {

    switch (action.type) {
        case SET_DATE:
            const startDay = new Date(action.startDay.getFullYear(), action.startDay.getMonth(), 1).getDay()
            return {
                ...state,
                date: action.date,
                day: action.day,
                month: action.month,
                year: action.year,
                selectedDate: action.selectedDate,
                startDay: startDay === 0 ? 7 : startDay
            };

        case SET_MINI_DATE:
            const miniStartDay = new Date(action.miniStartDay.getFullYear(), action.miniStartDay.getMonth(), 1).getDay()
            return {
                ...state,
                miniDate: action.miniDate,
                miniDay: action.miniDay,
                miniMonth: action.miniMonth,
                miniYear: action.miniYear,
                miniStartDay: miniStartDay === 0 ? 7 : miniStartDay,
            }

        case MENU_MODAL_OPEN:
            return {
                ...state,
                menuModalOpen: action.menuModalOpen
            }

        case OPEN_ALERT_BEFORE_DELETE:
            return {
                ...state,
                openAlertBeforeDelete: action.openAlertBeforeDelete
            }

        case SELECTED_VIEW:
            return {
                ...state,
                selectedView: action.selectedView
            }

        case OPEN_RIGHT_FORM:
            return {
                ...state,
                dropdownOpenRightForm: action.dropdownOpenRightForm
            }
    
        default:
            return [];
    }
}