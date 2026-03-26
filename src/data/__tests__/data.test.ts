import { describe, it, expect } from 'vitest'
import { projects } from '../projects'
import { profile } from '../profile'

describe('projects data layer', () => {
  it('exports at least one featured project', () => {
    expect(projects.some((p) => p.featured)).toBe(true)
  })

  it('contains a project with video.type youtube', () => {
    expect(projects.some((p) => p.video.type === 'youtube')).toBe(true)
  })

  it('contains a project with video.type local', () => {
    expect(projects.some((p) => p.video.type === 'local')).toBe(true)
  })

  it('contains a project with video.type none', () => {
    expect(projects.some((p) => p.video.type === 'none')).toBe(true)
  })

  it('project with video.type none has no url', () => {
    const noneProject = projects.find((p) => p.video.type === 'none')
    expect(noneProject?.video.url).toBeUndefined()
  })

  it('all projects have required fields', () => {
    for (const p of projects) {
      expect(p.id).toBeTruthy()
      expect(p.slug).toBeTruthy()
      expect(p.title).toBeTruthy()
      expect(p.technologies.length).toBeGreaterThan(0)
    }
  })
})

describe('profile data layer', () => {
  it('has all required fields', () => {
    expect(profile.name).toBeTruthy()
    expect(profile.title).toBeTruthy()
    expect(profile.bio).toBeTruthy()
    expect(profile.location).toBeTruthy()
    expect(typeof profile.availableForWork).toBe('boolean')
    expect(profile.skills.length).toBeGreaterThan(0)
    expect(profile.social.github).toBeTruthy()
    expect(profile.social.linkedin).toBeTruthy()
    expect(profile.social.email).toBeTruthy()
  })
})
