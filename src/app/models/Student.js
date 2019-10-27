import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        idade: Sequelize.INTEGER,
        peso: Sequelize.REAL,
        altura: Sequelize.REAL,
      },
      {
        sequelize,
      }
    );
  }
}

export default Student;
