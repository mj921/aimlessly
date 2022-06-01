list = [{
  name: '朽木',
  lv: 1,
  type: '木材',
  quality: '普通',
},
{
  name: '朽木堆',
  lv: 2,
  type: '木材',
  quality: '普通',
},
{
  name: '朽木捆',
  lv: 3,
  type: '木材',
  quality: '普通',
},
{
  name: '树篱地精的微型小屋',
  lv: 4,
  type: '木材',
  quality: '罕见',
}]
dd = list.reduce((arr, el, i) => i === list.length - 1 ? arr : arr.concat({source: el.name, target: list[i+1].name, type: '合成'}), [])