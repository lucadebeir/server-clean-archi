import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";
import Recipe from "../../../../core/domain/Recipe";
import db from "../config/db";
import CommentaireSequelize from "./Commentaire.model";
import FavoriSequelize from "./Favori.model";
import MenuSequelize from "./Menu.model";
import NotationSequelize from "./Notation.model";
import NotificationSequelize from "./Notification.model";
import RecipeListSequelize from "./RecipeList.model";
import StepSequelize from "./Step.model";

interface RecipeModel extends Model<Recipe>, Recipe {
}

type RecipeStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): RecipeModel;
};

function RecipeFactory(sequelize: Sequelize): RecipeStatic {
    return <RecipeStatic>sequelize.define(
        "recipes",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },

            date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            number_favorites: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            number_views: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            number_portion: {
                type: DataTypes.INTEGER,
            },
            name_portion: {
                type: DataTypes.STRING,
            },
            preparation_time: {
                type: DataTypes.TIME,
            },
            rest_time: {
                type: DataTypes.TIME,
            },
            cooking_time: {
                type: DataTypes.TIME
            },
            astuce: {
                type: DataTypes.TEXT,
            },
            mot: {
                type: DataTypes.STRING,
            },
            difficulty: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        },
        {
            timestamps: false,
            tableName: "recipes",
            modelName: "Recipe"
        }
    );
}

const RecipeSequelize = RecipeFactory(db.sequelize);

//association 0:N avec les notifications
NotificationSequelize.belongsTo(RecipeSequelize, {
    foreignKey: {name: "id_recipe"},
});
RecipeSequelize.hasMany(NotificationSequelize, {
    foreignKey: {name: "id"},
});

//association 0:N avec les favoris
FavoriSequelize.belongsTo(RecipeSequelize, {
    foreignKey: {name: "id_recipe"},
});
RecipeSequelize.hasMany(FavoriSequelize, {
    foreignKey: {name: "id_recipe"},
});

//association 0:N avec les étapes
StepSequelize.belongsTo(RecipeSequelize, {
    foreignKey: {name: "id_recipe"},
});
RecipeSequelize.hasMany(StepSequelize, {
    foreignKey: {name: "id_recipe"},
});

//association 0:N avec le menu
MenuSequelize.belongsTo(RecipeSequelize, {
    foreignKey: {name: "id_recipe"},
});
RecipeSequelize.hasMany(MenuSequelize, {
    foreignKey: {name: "id_recipe"},
});

//association 0:N avec les notations
NotationSequelize.belongsTo(RecipeSequelize, {
    foreignKey: {name: "id_recipe"},
});
RecipeSequelize.hasMany(NotationSequelize, {
    foreignKey: {name: "id_recipe"},
});

//association 0:N avec les commentaires
CommentaireSequelize.belongsTo(RecipeSequelize, {
    foreignKey: {name: "id_recipe"},
});
RecipeSequelize.hasMany(CommentaireSequelize, {
    foreignKey: {name: "id_recipe"},
});

//association 0:N avec les commentaires
RecipeListSequelize.belongsTo(RecipeSequelize, {
    foreignKey: {name: "id_recipe"},
});
RecipeSequelize.hasMany(RecipeListSequelize, {
    foreignKey: {name: "id"},
});

export = RecipeSequelize;
