import {Game} from "@/proto/bbuhot/service/game_pb";

export class EditGameModel {
  public id: number;
  public name: string;
  public desc: string;
  public visible: boolean;
  public status: number;
  public statusStr: string;
  public limit: number;
  public lowest: number;
  public highest: number;
  public endTimeMs: number;
  public endTimeStr: string;
  public betOption = {
    name: '',
    odd: 0
  };
  public bettingOptionList: Array<any>;

  constructor(game?: Game) {
    this.id = game ? game.getId()! : -1;
    this.name = game ? game.getName()! : "";
    this.desc = game ? game.getDescription()! : "";
    this.visible = game ? game.getNormalUserVisible()! : false;
    this.status = game ? game.getStatus()! : Game.Status.DRAFT;
    let statusStr = "草稿";
    switch (this.status) {
      case 0: {
        statusStr = "草稿";
        break;
      }
      case 1: {
        statusStr = "发布";
        break;
      }
      case 2: {
        statusStr = "结算";
        break;
      }
      case 3: {
        statusStr = "流局";
        break;
      }
    }
    this.statusStr = statusStr;
    this.limit = game ? game.getBetOptionLimit()! : 1;
    this.lowest = game ? game.getBetAmountLowest()! : 100;
    this.highest = game ? game.getBetAmountHighest()! : 300;
    this.endTimeMs = game ? game.getEndTimeMs()! : 0;
    this.endTimeStr = game ? new Date(game.getEndTimeMs()!).toLocaleDateString() : "";
    this.bettingOptionList = [];
    // console.log('list opt', game ? game.getBettingOptionsList() : []);
    let tmpBtList = game ? game.getBettingOptionsList()! : [];
    if (tmpBtList.length > 0) {

      for (let i = 0; i < tmpBtList.length; i++) {
        let tmp = {
          name: '',
          odd: 0
        };
        tmp.name = String(tmpBtList[i].getName()!);
        tmp.odd = Number(tmpBtList[i].getOdds()! / Math.pow(10, 6));
        this.bettingOptionList.push(tmp);
      }
    }
  }
}
