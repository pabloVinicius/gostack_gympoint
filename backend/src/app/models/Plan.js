import Sequelize, { Model } from 'sequelize';
import { convertCentsToMoney } from '../helpers/PlanHelpers';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        price: Sequelize.INTEGER,
        duration: Sequelize.INTEGER,
        disabled_at: Sequelize.DATE,
        textualPrice: {
          type: Sequelize.VIRTUAL,
          get() {
            return convertCentsToMoney(this.price);
          },
        },
        totalPrice: {
          type: Sequelize.VIRTUAL,
          get() {
            return convertCentsToMoney(this.price * this.duration);
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Plan;
