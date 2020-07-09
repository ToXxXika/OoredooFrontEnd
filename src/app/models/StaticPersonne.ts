export class StaticPersonne {
  cin?;
  username?;
  mail?;
  nom?;
  prenom?;
  motdepasse?;
  role?;
  numTel?;
  idbou?;
  horaireDeTravail?;
  disponibilite?;
  coursierByCin?;
  agentcommercialByCin?;

  Verification(data: any, b: boolean) {
    if (b) {
      if (data['cin'] !== null) {
        this.cin = data['cin'];
      }
      if (data['username'] !== null) {
        this.username = data['username'];
      }
      if (data['mail'] !== null) {
        this.mail = data['mail'];
      }
      if (data['motdepasse'] !== null) {
        this.motdepasse = data['motdepasse'];
      }
      if (data['nom'] !== null) {
        this.nom = data['nom'];
      }
      if (data['prenom'] !== null) {
        this.prenom = data['prenom'];
      }
      if (data['numTel'] !== null) {
        this.numTel = data['numTel'];
      }
      if (data['role'] !== null) {
        this.role = data['role'];
      }
    if (data.agentcommercialByCin !== null) {
        this.horaireDeTravail = data.agentcommercialByCin.horaireDeTravail;
        this.idbou = data.agentcommercialByCin.idBou;
      }
     if (data.coursierByCin !== null) {
        this.disponibilite = data.coursierByCin.disponibilite;
      }

    }
  }
}
