import Commentaire from "../domain/Commentaire";

export default (date: Commentaire) => {
  if(date.date) {
    const options: any = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    const d = new Date(date.date);

    return d.toLocaleString('FR-fr');
  }
}
