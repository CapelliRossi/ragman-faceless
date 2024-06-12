import { DependencyContainer } from "tsyringe";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
		
class Mod implements IPostAkiLoadMod, IPostDBLoadMod 
{
    container: DependencyContainer;

    public postAkiLoad(container: DependencyContainer): void 
    {
        this.container = container;
    }

    public postDBLoad(container: DependencyContainer): void 
    {
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables = databaseServer.getTables();

        const item = "6176a48d732a664031271438",
            price = 18000;

        const ragman = tables.traders["5ac3b934156ae10c4430e83c"];

        ragman.assort.items.push({
            "_id": item,
            "_tpl": item,
            "parentId": "hideout",
            "slotId": "hideout",
            "upd":
      {
          "UnlimitedCount": true,
          "StackObjectsCount": 999999
      }
        });
        ragman.assort.barter_scheme[item] = [
            [
                {
                    "count": price,
                    "_tpl": "5449016a4bdc2d6f028b456f" // roubles
                }
            ]
        ];
        ragman.assort.loyal_level_items[item] = 1;
    }
}

module.exports = { mod: new Mod() }