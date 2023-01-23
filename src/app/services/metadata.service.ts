import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TypeMetadataFields } from '@server/models/contentful-content-types/metadata';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private meta!: TypeMetadataFields;

  constructor(private title: Title, private metadata: Meta) { }

  setMetadata(meta: TypeMetadataFields): void {
    this.meta = meta;
    this.setName();
    this.setTitle();
    this.setDescription();
    this.setKeywords();
    this.setRobots();
  }

  private setName():void {
    this.metadata.updateTag(
      { name: 'name', content: this.meta.name },
    );
  }

  private setTitle():void {
    this.title.setTitle(this.meta.title);
  }

  private setDescription():void {
    this.metadata.updateTag(
      { name: 'description', content: this.meta.description },
    );
  }

  private setKeywords():void {
    this.metadata.updateTag(
      { name: 'keywords', content: this.meta.keywords.join(', ') },
    );
  }

  private setRobots():void {
    const follow = this.meta.follow ? 'follow' : 'nofollow';
    const index = this.meta.index ? 'index' : 'noindex';

    this.metadata.updateTag(
      { name: 'robots', content: `${index}, ${follow}` },
    );
  }
}
