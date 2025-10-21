import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/fr'


dayjs.extend(relativeTime)
dayjs.locale('fr')




export default {
  
  formatDate (datetimeString) {
    return dayjs(datetimeString).format('DD/MM/YYYY') // => "07 Aug 2025"
  },
  
  relativeTime (date) {
      return dayjs(date).fromNow()
  },

   formatMontant (montant) {
    return new Intl.NumberFormat('fr-MG', {
      style: 'currency',
      currency: 'MGA'
    }).format(montant);
  },
}