import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'storyName'
})
export class StoryNamePipe implements PipeTransform {
    transform(storyName: string): string {
        if (storyName) {
            return storyName.replace('story from ', '').replace('cover from ', '');
        }

        return '';
    }
}
