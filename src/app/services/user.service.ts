import {Injectable} from '@angular/core';
import {CommonService} from "./common.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private commonService: CommonService, private router: Router) {
  }

  async login(username: String, password: String): Promise<any> {
    try {
      const res = await this.commonService.postRequest('users/login', {username, password});
      return res;
    } catch (e) {
      if (e instanceof HttpErrorResponse)
        if (e.status == 404)
          throw {message: 'User not found! :('};

    }
  }

  async register(fname: any, lname: any, email: any, username: any, password: any): Promise<any> {
    try {
      const res = await this.commonService.postRequest('users/register', {fname, lname, email, username, password});
      return res;
    } catch (e) {
      if (e instanceof HttpErrorResponse)
        if (e.status == 500)
          alert(e.error.error);
    }
  }

  async getLists(): Promise<any> {
    try {
      const res = await this.commonService.getRequest('users/lists');
      return res;
    } catch (e) {
      if (e instanceof HttpErrorResponse)
        if (e.status == 401)
          await this.router.navigate(['login']);
    }
  }

  async role(): Promise<any> {
    try {
      const res = await this.commonService.getRequest('users/role');
      return res;
    } catch (e) {
    }
  }

  async getLogs(role: any): Promise<any> {
    try {
      const res = await this.commonService.getRequest('logs/' + role);
      return res;
    } catch (e) {
      if (e instanceof HttpErrorResponse)
        if (e.status == 401)
          await this.router.navigate(['login']);
    }
  }

  async getItems(listid: any): Promise<any> {
    try {
      const res = await this.commonService.getRequest('lists/items/' + listid);
      return res;
    } catch (e) {
      if (e instanceof HttpErrorResponse)
        if (e.status == 401)
          await this.router.navigate(['login']);
    }
  }

  async updateListName(listid: any, listname: any, dateModified: any): Promise<any> {
    try {
      const res = await this.commonService.putRequest('lists/list', {listid, listname, dateModified});
      return res;
    } catch (e) {
      throw {message: 'Something went wrong when updating the list name :('};
    }
  }

  async updateItemName(itemsid: any, itemname: any, dateModified: any,listname: any): Promise<any> {
    try {
      const res = await this.commonService.putRequest('lists/item', {itemsid, itemname, dateModified,listname});
      return res;
    } catch (e) {
      throw {message: 'Something went wrong when updating the item name :('};
    }
  }

  async  addReminder(reminder: any, itemsid: any) {
    try {
      await this.commonService.putRequest('lists/item/reminder', {
        reminder,
        itemsid,
      });
    } catch (e) {
      throw e;
    }
  }

  async  deleteReminder(itemsid: any) {
    try {
      return await this.commonService.putRequest('lists/list/item/delete/reminder', {
        itemsid,
      });
    } catch (e) {
      throw e;
    }
  }

  async deleteList(listid: any, listname: any): Promise<any> {
    try {
      const res = await this.commonService.deleteRequest('lists/list/' + listid + '/' + listname);
      return res;
    } catch (e) {
      throw {message: 'Something went wrong when deleting the list :('};
    }
  }

  async deleteItem(itemsid: any, itemname: any): Promise<any> {
    try {
      const res = await this.commonService.deleteRequest('lists/list/item/' + itemsid + '/' + itemname);
      return res;
    } catch (e) {
      throw {message: 'Something went wrong when deleting the item :('};
    }
  }

  async addList(listname: any): Promise<any> {
    try {
      const res = await this.commonService.postRequest('lists/list/add', {listname});
      return res;
    } catch (e) {
      throw {message: 'Please fill in the list name!'};
    }
  }

  async addItem(id: any,listname:any, itemname: any): Promise<any> {
    try {
      const res = await this.commonService.postRequest('lists/list/item/add', {id,listname, itemname});
      return res;
    } catch (e) {
      throw {message: 'Please fill in the item name!'};
    }
  }

  async getUsers() {
    try {
      const res = await this.commonService.getRequest('users/all');
      return res;
    } catch (e) {
      if (e instanceof HttpErrorResponse)
        if (e.status == 401)
          await this.router.navigate(['login']);
    }
  }

  async updateUser(firstname: any, lastname: any, email: any, username: any, roleid: any, userid: any) {
    try {
      const res = await this.commonService.putRequest('users/update', {
        firstname,
        lastname,
        email,
        username,
        roleid,
        userid,
      });
      return res;
    } catch (e) {
      throw {message: 'Something went wrong when updating the user :('};
    }
  }

  async deleteUser(id: any) {
    try {
      const res = await this.commonService.deleteRequest('users/delete/' + id);
      return res;
    } catch (e) {
      throw {message: 'Something went wrong when deleting the user:('};
    }
  }
}



