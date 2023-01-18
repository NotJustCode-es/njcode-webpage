import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MetadataInfoEnum } from '../models/metadata-info.enum';

@Injectable({
  providedIn: 'root',
})
export class MetadaService {
  private meta!: Record<string, unknown>;

  private follow!: string;

  private index!: string;

  constructor(private title: Title, private metadata: Meta) { }

  setMetadata(meta: Record<string, unknown>): void {
    this.meta = meta;
    this.setName();
    this.setTitle();
    this.setDescription();
    this.setKeywords();
    this.setViewport();
    this.setCharset();
    this.setRobots();
  }

  private setName():void {
    this.metadata.updateTag(
      { name: 'name', content: this.meta[MetadataInfoEnum.Name] as string },
    );
  }

  private setTitle():void {
    this.title.setTitle(this.meta[MetadataInfoEnum.Title] as string);
  }

  private setDescription():void {
    this.metadata.updateTag(
      { name: 'description', content: this.meta[MetadataInfoEnum.Description] as string },
    );
  }

  private setKeywords():void {
    this.metadata.updateTag(
      { name: 'keywords', content: (this.meta[MetadataInfoEnum.Keywords] as string) },
    );
  }

  private setViewport():void {
    this.metadata.updateTag(
      { name: 'viewport', content: this.meta[MetadataInfoEnum.Viewport] as string },
    );
  }

  private setCharset():void {
    this.metadata.updateTag(
      { name: 'charset', content: this.meta[MetadataInfoEnum.Charset] as string },
    );
  }

  private setRobots():void {
    this.follow = this.meta[MetadataInfoEnum.Follow] as boolean ? 'follow' : 'nofollow';
    this.index = this.meta[MetadataInfoEnum.Index] as boolean ? 'index' : 'noindex';

    this.metadata.updateTag(
      { name: 'robots', content: `${this.index}, ${this.follow}` },
    );
  }
}
