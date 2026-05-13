import { ChangeDetectorRef, Directive, OnInit } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Directive()
export abstract class BaseList<T extends { id?: number }> implements OnInit {
  items: T[] = [];
  showForm = false;
  loadingList = true;
  loading = false;
  editingId: number | null = null;
  currentItem: T = {} as T;

  constructor(protected cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.load(); }

  abstract getItems(): Observable<T[]>;
  abstract saveItem(item: T, id?: number | null): Observable<T>;
  abstract deleteItem(id: number): Observable<void>;
  abstract resetItem(): T;

  load(): void {
    this.loadingList = true;
    this.cdr.markForCheck();
    this.getItems().pipe(finalize(() => { this.loadingList = false; this.cdr.markForCheck(); }))
      .subscribe(data => this.items = [...data]);
  }

  openAdd(): void { 
    this.currentItem = this.resetItem(); 
    this.editingId = null; 
    this.showForm = true; 
    this.cdr.markForCheck(); 
  }

  save(): void {
    if (this.loading) return;
    this.loading = true;
    this.cdr.markForCheck();
    this.saveItem(this.currentItem, this.editingId)
      .pipe(finalize(() => { this.loading = false; this.cdr.markForCheck(); }))
      .subscribe(() => { this.load(); this.cancel(); });
  }

  edit(item: T): void { 
    this.editingId = item.id!; 
    this.currentItem = { ...item }; 
    this.showForm = true; 
    this.cdr.markForCheck(); 
  }

  delete(id: number, message = 'Delete this item?'): void { 
    if (confirm(message)) { 
      this.deleteItem(id).subscribe(() => this.load()); 
    } 
  }

  cancel(): void { 
    this.showForm = false; 
    this.editingId = null; 
    this.currentItem = this.resetItem(); 
    this.cdr.markForCheck(); 
  }

  trackById(index: number, item: T): number { return item.id!; }
}
