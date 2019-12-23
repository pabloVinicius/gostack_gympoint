import Sequelize, { Model } from 'sequelize';
import { isBefore, isAfter } from 'date-fns';
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
        active: {
          type: Sequelize.VIRTUAL,
          get() {
            return (
              isBefore(new Date(), this.end_date) &&
              isAfter(new Date(), this.start_date)
            );
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
