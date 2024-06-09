import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { Tag } from '../../models/tag/tag';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tags-assigner',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tags-assigner.component.html',
  styleUrl: './tags-assigner.component.scss'
})
export class TagsAssignerComponent implements OnInit {

  public tags: Tag[];

  @Output('tagsChanged') 
  public tagsChanged: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();
  public inputValue = '';

  @Input('tags') 
  public set tagsInput(value: Tag[]) {
    this.tags = value;
  }
  
  constructor(private readonly _tagsService: TagsService) {
    this.tags = new Array<Tag>();
  }

  public ngOnInit(): void {
    console.log('TagsAssignerComponent initialized');
  }

  public addTag(): void {
    if (this.inputValue) {
      this._tagsService.createTag({ name: this.inputValue } as Tag).subscribe((tag) => {
  
        if (this.tags && this.tags.find(t => t.id === tag.id))
          return;

        if (!!this.tags)
          this.tags.push(tag);
        else
          this.tags = [tag];

        this.emitTagIds();
        this.inputValue = '';
      });
    }
  }

  public removeTag(tag?: Tag): void {
    if (tag) {
      this.tags = this.tags.filter(t => t.id !== tag.id);
    } else if (!this.inputValue && this.tags.length) {
      this.tags.pop();
    }
    this.emitTagIds();
  }

  private emitTagIds(): void {
    this.tagsChanged.emit(this.tags);
  }

}
