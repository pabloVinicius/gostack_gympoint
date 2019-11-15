import Sequelize, { Model } from 'sequelize';
import { convertCentsToMoney } from '../helpers/PlanHelpers';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        price: Sequelize.INTEGER,
        duration: Sequelize.INTEGER,
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
  }
}

export default Plan;
