import Sequelize, { Model } from 'sequelize';
import { convertCentsToMoney } from '../helpers/PlanHelpers';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.INTEGER,
        disabled_at: Sequelize.DATE,
        textualPrice: {
          type: Sequelize.VIRTUAL,
          get() {
            return convertCentsToMoney(this.price);
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Registration;